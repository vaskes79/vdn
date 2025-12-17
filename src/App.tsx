import { useEffect, useRef } from "react";
import { seedDatabase } from "@db";
import { useVideoStore, useNotesStore } from "@store";
import { PlayerContext } from "@components/Video/PlayerContext";
import { NavBar } from "@components/NavBar";
import { Main, MainLeft, MainRight, Footer } from "@components/Layout";
import { VideoPlayer } from "@components/Video";
import { Notes } from "@components/Notes";
import type { PlayerInstance } from "@components/Video/PlayerContext";

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
          <VideoPlayer ref={playerRef} />
        </MainLeft>
        <MainRight>
          <Notes />
        </MainRight>
      </Main>
      <Footer />
    </PlayerContext.Provider>
  );
}
