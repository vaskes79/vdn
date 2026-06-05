import { settingsService, videoService } from "@services";
import type { VideoStoreActions, VideoStoreState } from "@types";
import { toast } from "@utils/toast";
import { create } from "zustand";

type VideoStore = VideoStoreState & VideoStoreActions;

export const useVideoStore = create<VideoStore>((set, get) => ({
	// State
	currentVideoUrl: "",
	isPlaying: false,
	videos: [],
	isLoaded: false,

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
		set({ videos, currentVideoUrl: currentUrl, isLoaded: true });
	},

	addVideo: async (url: string, title: string) => {
		const exists = await videoService.exists(url);
		if (exists) {
			toast("This video is already in your list", "error");
			return;
		}
		await videoService.add({ url, title });
		await settingsService.setCurrentVideo(url);
		await get().loadVideos();
		set({ currentVideoUrl: url });
	},

	removeVideo: async (url: string) => {
		await videoService.remove(url);
		const remaining = get().videos.filter((v) => v.url !== url);
		const nextUrl = remaining[0]?.url ?? "";
		await settingsService.setCurrentVideo(nextUrl);
		await get().loadVideos();
		set({ currentVideoUrl: nextUrl });
		toast("Video removed");
	},

	editVideo: async (url: string, title: string) => {
		await videoService.update(url, title);
		await get().loadVideos();
	},
}));
