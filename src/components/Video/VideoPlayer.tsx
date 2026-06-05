import { useVideoStore } from "@store";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import ReactPlayer from "react-player";
import type { PlayerInstance } from "./PlayerContext";
import styles from "./VideoPlayer.module.css";

interface ReactPlayerRef {
	seekTo?: (amount: number, type?: string) => void;
	getCurrentTime?: () => number;
	getInternalPlayer?: () => { seekTo?: (amount: number, type?: boolean) => void } | null;
	api?: {
		seekTo: (amount: number, type?: boolean) => void;
		getCurrentTime: () => number;
	};
}

export const VideoPlayer = forwardRef<PlayerInstance>((_, ref) => {
	const { currentVideoUrl, isPlaying, setPlaying } = useVideoStore();
	const reactPlayerRef = useRef<ReactPlayerRef | null>(null);
	const pendingSeekRef = useRef<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [playerHeight, setPlayerHeight] = useState(0);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const ro = new ResizeObserver(([entry]) => {
			setPlayerHeight(entry.contentRect.height);
		});

		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	// Callback ref для ReactPlayer — react-player v3 типизирует ref как HTMLVideoElement,
	// но в рантайме передаёт инстанс ReactPlayer, поэтому кастуем
	const setReactPlayerRef = useCallback((player: HTMLVideoElement | null) => {
		reactPlayerRef.current = player as unknown as ReactPlayerRef | null;
	}, []);

	const performSeek = useCallback((seconds: number) => {
		const player = reactPlayerRef.current;

		if (!player) {
			return false;
		}

		// Способ 1: прямой доступ к seekTo на ReactPlayer
		if (typeof player.seekTo === "function") {
			try {
				player.seekTo(seconds, "seconds");
				return true;
			} catch (_error) {
				// Игнорируем ошибку, пробуем следующий способ
			}
		}

		// Способ 2: через api (YouTube Web Component)
		if (player.api && typeof player.api.seekTo === "function") {
			try {
				player.api.seekTo(seconds, true);
				return true;
			} catch (_error) {
				// Игнорируем ошибку, пробуем следующий способ
			}
		}

		// Способ 3: через getInternalPlayer
		if (typeof player.getInternalPlayer === "function") {
			try {
				const internalPlayer = player.getInternalPlayer();
				if (internalPlayer && typeof internalPlayer.seekTo === "function") {
					internalPlayer.seekTo(seconds, true);
					return true;
				}
			} catch (_error) {
				// Игнорируем ошибку
			}
		}

		return false;
	}, []);

	useImperativeHandle(ref, () => ({
		getCurrentTime: () => {
			const player = reactPlayerRef.current;

			if (!player) {
				return 0;
			}

			// Способ 1: прямой метод getCurrentTime
			if (typeof player.getCurrentTime === "function") {
				return player.getCurrentTime();
			}

			// Способ 2: через api (YouTube Web Component)
			if (player.api && typeof player.api.getCurrentTime === "function") {
				return player.api.getCurrentTime();
			}

			return 0;
		},
		seekTo: (seconds: number) => {
			if (performSeek(seconds)) {
				pendingSeekRef.current = null;
			} else {
				// Если не удалось выполнить, сохраняем для повторной попытки
				pendingSeekRef.current = seconds;
			}
		},
	}));

	const handleReady = () => {
		if (pendingSeekRef.current === null) return;

		const trySeek = (attemptsLeft: number) => {
			if (pendingSeekRef.current === null) return;
			if (performSeek(pendingSeekRef.current)) {
				pendingSeekRef.current = null;
				return;
			}
			if (attemptsLeft > 0) {
				requestAnimationFrame(() => trySeek(attemptsLeft - 1));
			}
		};

		trySeek(30);
	};

	return (
		<div ref={containerRef} className={styles.root}>
			{playerHeight > 0 && (
				<ReactPlayer
					ref={setReactPlayerRef}
					src={currentVideoUrl}
					width="100%"
					height={playerHeight}
					controls
					playing={isPlaying}
					onPlay={() => setPlaying(true)}
					onPause={() => setPlaying(false)}
					onReady={handleReady}
				/>
			)}
		</div>
	);
});

VideoPlayer.displayName = "VideoPlayer";
