import { create } from "zustand";
import { videoService, settingsService } from "@services";
import type { VideoStoreState, VideoStoreActions } from "@types";

type VideoStore = VideoStoreState & VideoStoreActions;

export const useVideoStore = create<VideoStore>((set, get) => ({
  // State
  currentVideoUrl: "",
  isPlaying: false,
  videos: [],

  // Actions
  setCurrentVideo: async (url: string) => {
    await settingsService.setCurrentVideo(url);
    set({ currentVideoUrl: url, isPlaying: false });
  },

  setPlaying: (playing: boolean) => {
    set({ isPlaying: playing });
  },

  loadVideos: async () => {
    const videos = await videoService.getAll();
    const currentUrl = await settingsService.getCurrentVideo();
    set({ videos, currentVideoUrl: currentUrl });
  },

  addVideo: async (url: string, title: string) => {
    await videoService.add({ url, title });
    await settingsService.setCurrentVideo(url);
    await get().loadVideos();
    set({ currentVideoUrl: url });
  },

  removeVideo: async (url: string) => {
    await videoService.remove(url);
    const defaultUrl = "https://youtu.be/cCOL7MC4Pl0";
    await settingsService.setCurrentVideo(defaultUrl);
    await get().loadVideos();
    set({ currentVideoUrl: defaultUrl });
  },

  editVideo: async (url: string, title: string) => {
    await videoService.update(url, title);
    await get().loadVideos();
  },
}));
