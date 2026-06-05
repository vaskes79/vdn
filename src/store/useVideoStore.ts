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
	isLoading: false,

	// Actions
	setCurrentVideo: async (url: string) => {
		await settingsService.setCurrentVideo(url);
		set({ currentVideoUrl: url, isPlaying: false });
	},

	setPlaying: (playing: boolean) => {
		set({ isPlaying: playing });
	},

	loadVideos: async () => {
		try {
			const videos = await videoService.getAll();
			const currentUrl = await settingsService.getCurrentVideo();
			set({ videos, currentVideoUrl: currentUrl, isLoaded: true });
		} catch {
			toast("Failed to load videos", "error");
			set({ isLoaded: true });
		}
	},

	addVideo: async (url: string, title: string) => {
		try {
			const exists = await videoService.exists(url);
			if (exists) {
				toast("This video is already in your list", "error");
				return;
			}
			set({ isLoading: true });
			await videoService.add({ url, title });
			await settingsService.setCurrentVideo(url);
			await get().loadVideos();
			set({ currentVideoUrl: url });
		} catch {
			toast("Failed to add video", "error");
		} finally {
			set({ isLoading: false });
		}
	},

	removeVideo: async (url: string) => {
		try {
			set({ isLoading: true });
			await videoService.remove(url);
			const remaining = get().videos.filter((v) => v.url !== url);
			const nextUrl = remaining[0]?.url ?? "";
			await settingsService.setCurrentVideo(nextUrl);
			await get().loadVideos();
			set({ currentVideoUrl: nextUrl });
			toast("Video removed");
		} catch {
			toast("Failed to remove video", "error");
		} finally {
			set({ isLoading: false });
		}
	},

	editVideo: async (url: string, title: string) => {
		try {
			set({ isLoading: true });
			await videoService.update(url, title);
			await get().loadVideos();
		} catch {
			toast("Failed to update video", "error");
		} finally {
			set({ isLoading: false });
		}
	},
}));
