import { forwardRef, useRef, useImperativeHandle, useCallback } from "react";
import ReactPlayer from "react-player";
import { useVideoStore } from "@store";
import type { PlayerInstance } from "./PlayerContext";
import styles from "./VideoPlayer.module.css";

export const VideoPlayer = forwardRef<PlayerInstance>((_, ref) => {
  const { currentVideoUrl, isPlaying, setPlaying } = useVideoStore();
  const reactPlayerRef = useRef<any>(null);
  const pendingSeekRef = useRef<number | null>(null);

  // Callback ref для ReactPlayer
  const setReactPlayerRef = useCallback((player: any) => {
    reactPlayerRef.current = player;
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
      } catch (error) {
        // Игнорируем ошибку, пробуем следующий способ
      }
    }

    // Способ 2: через api (YouTube Web Component)
    if (player.api && typeof player.api.seekTo === "function") {
      try {
        player.api.seekTo(seconds, true);
        return true;
      } catch (error) {
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
      } catch (error) {
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
    // Выполняем отложенный seekTo, если он был
    if (pendingSeekRef.current !== null) {
      setTimeout(() => {
        if (performSeek(pendingSeekRef.current!)) {
          pendingSeekRef.current = null;
        }
      }, 100);
    }
  };

  return (
    <div className={styles.root}>
      <ReactPlayer
        ref={setReactPlayerRef}
        src={currentVideoUrl}
        width="100%"
        height={`${window.innerHeight - 150}px`}
        controls
        playing={isPlaying}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onReady={handleReady}
      />
    </div>
  );
});

VideoPlayer.displayName = "VideoPlayer";
