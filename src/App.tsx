import { EmptyState, ErrorBoundary, Footer, Main, MainLeft, MainRight } from "@components/Layout";
import { NavBar } from "@components/NavBar";
import { Notes } from "@components/Notes";
import { Toaster } from "@components/Toaster";
import type { PlayerInstance } from "@components/Video/PlayerContext";
import { PlayerContext } from "@components/Video/PlayerContext";
import { useNotesStore, useVideoStore } from "@store";
import { lazy, Suspense, useEffect, useMemo, useRef } from "react";

const VideoPlayer = lazy(() =>
	import("@components/Video").then((module) => ({
		default: module.VideoPlayer,
	})),
);

export function App() {
	const currentVideoUrl = useVideoStore((s) => s.currentVideoUrl);
	const loadVideos = useVideoStore((s) => s.loadVideos);
	const videos = useVideoStore((s) => s.videos);
	const isLoaded = useVideoStore((s) => s.isLoaded);
	const loadNotes = useNotesStore((s) => s.loadNotes);
	const playerRef = useRef<PlayerInstance>(null);

	useEffect(() => {
		loadVideos();
	}, [loadVideos]);

	useEffect(() => {
		if (currentVideoUrl) {
			loadNotes(currentVideoUrl);
		}
	}, [currentVideoUrl, loadNotes]);

	const playerContextValue = useMemo(
		() => ({
			player: playerRef,
			getCurrentTime: () => playerRef.current?.getCurrentTime() || 0,
			seekTo: (seconds: number) => playerRef.current?.seekTo(seconds),
		}),
		[],
	);

	const isEmpty = isLoaded && videos.length === 0;

	return (
		<ErrorBoundary>
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
		</ErrorBoundary>
	);
}
