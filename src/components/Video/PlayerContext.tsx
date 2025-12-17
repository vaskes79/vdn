import { createContext, useContext } from "react";

export interface PlayerInstance {
  getCurrentTime: () => number;
  seekTo: (seconds: number) => void;
}

export interface PlayerContextValue {
  player: React.MutableRefObject<PlayerInstance | null> | null;
  getCurrentTime: () => number;
  seekTo: (seconds: number) => void;
}

export const PlayerContext = createContext<PlayerContextValue>({
  player: null,
  getCurrentTime: () => 0,
  seekTo: () => {},
});

export const usePlayer = () => useContext(PlayerContext);
