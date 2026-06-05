import { EmptyState, Footer, Main, MainLeft, MainRight } from "@components/Layout";
import { NavBar } from "@components/NavBar";
import { Notes } from "@components/Notes";
import { Toaster } from "@components/Toaster";
import type { PlayerInstance } from "@components/Video/PlayerContext";
import { PlayerContext } from "@components/Video/PlayerContext";
import { useNotesStore, useVideoStore } from "@store";
import { lazy, Suspense, useEffect, useRef } from "react";

const VideoPlayer = lazy(() =>
	import("@components/Video").then((module) => ({
		default: module.VideoPlayer,
	})),
);

export function App() {
	const { currentVideoUrl, loadVideos, videos, isLoaded } = useVideoStore();
	const { loadNotes } = useNotesStore();
	const playerRef = useRef<PlayerInstance>(null);

	useEffect(() => {
		loadVideos();
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

	const isEmpty = isLoaded && videos.length === 0;

	return (
		<PlayerContext.Provider value={playerContextValue}>
			<NavBar />
			{isEmpty ? (
				<EmptyState />
			) : (
				<Main>
					<MainLeft>
						<Suspense
							fallback={
								<div
									style={{
										width: "100%",
										flex: 1,
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
			)}
			<Footer />
			<Toaster />
		</PlayerContext.Provider>
	);
}
