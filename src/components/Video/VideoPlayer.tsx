import { forwardRef, useRef, useImperativeHandle } from "react";
import ReactPlayer from "react-player";
import { useVideoStore } from "@store";
import type { PlayerInstance } from "./PlayerContext";
import styles from "./VideoPlayer.module.css";

export const VideoPlayer = forwardRef<PlayerInstance>((_, ref) => {
	const { currentVideoUrl, isPlaying, setPlaying } = useVideoStore();
	const playerRef = useRef<any>(null);

	useImperativeHandle(ref, () => ({
		getCurrentTime: () => {
			const player = playerRef.current;
			if (player && typeof player.getCurrentTime === "function") {
				return player.getCurrentTime();
			}
			return 0;
		},
		seekTo: (seconds: number) => {
			const player = playerRef.current;
			if (player && typeof player.seekTo === "function") {
				player.seekTo(seconds);
			}
		},
	}));

	return (
		<div className={styles.root}>
			<ReactPlayer
				ref={playerRef}
				src={currentVideoUrl}
				width="100%"
				height={`${window.innerHeight - 150}px`}
				controls
				playing={isPlaying}
				onPlay={() => setPlaying(true)}
				onPause={() => setPlaying(false)}
			/>
		</div>
	);
});

VideoPlayer.displayName = "VideoPlayer";

