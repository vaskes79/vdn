import { Footer, Main, MainLeft, MainRight } from "@components/Layout";
import { NavBar } from "@components/NavBar";
import { Notes } from "@components/Notes";
import type { PlayerInstance } from "@components/Video/PlayerContext";
import { PlayerContext } from "@components/Video/PlayerContext";
import { seedDatabase } from "@db";
import { useNotesStore, useVideoStore } from "@store";
import { lazy, Suspense, useEffect, useRef } from "react";

const VideoPlayer = lazy(() =>
	import("@components/Video").then((module) => ({
		default: module.VideoPlayer,
	})),
);

export function App() {
	const { currentVideoUrl, loadVideos } = useVideoStore();
	const { loadNotes } = useNotesStore();
	const playerRef = useRef<PlayerInstance>(null);

	useEffect(() => {
		seedDatabase().then(() => loadVideos());
	}, [loadVideos]);

	useEffect(() => {
		if (currentVideoUrl) {
			loadNotes(currentVideoUrl);
		}
	}, [currentVideoUrl, loadNotes]);

	const playerContextValue = {
		player: playerRef,
		getCurrentTime: () => {
			return playerRef.current?.getCurrentTime() || 0;
		},
		seekTo: (seconds: number) => {
			playerRef.current?.seekTo(seconds);
		},
	};

	return (
		<PlayerContext.Provider value={playerContextValue}>
			<NavBar />
			<Main>
				<MainLeft>
					<Suspense
						fallback={
							<div
								style={{
									width: "100%",
									height: `${window.innerHeight - 150}px`,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								Загрузка плеера...
							</div>
						}
					>
						<VideoPlayer ref={playerRef} />
					</Suspense>
				</MainLeft>
				<MainRight>
					<Notes />
				</MainRight>
			</Main>
			<Footer />
		</PlayerContext.Provider>
	);
}
