import { noteService, settingsService } from "@services";
import type { NotesStoreActions, NotesStoreState } from "@types";
import { toast } from "@utils/toast";
import { create } from "zustand";
import { useVideoStore } from "./useVideoStore";

type NotesStore = NotesStoreState & NotesStoreActions;

export const useNotesStore = create<NotesStore>((set, get) => ({
	// State
	notes: [],
	isLoading: false,

	// Actions
	loadNotes: async (url: string) => {
		try {
			const notes = await noteService.getByUrl(url);
			set({ notes });
		} catch {
			toast("Failed to load notes", "error");
		}
	},

	bulkAddNotes: async (url, timestamps) => {
		if (!timestamps.length) return;
		try {
			set({ isLoading: true });
			for (const { time, title } of timestamps) {
				await noteService.add({ url, title, time });
			}
			await get().loadNotes(url);
			toast(`Imported ${timestamps.length} timestamps`);
		} catch {
			toast("Failed to import timestamps", "error");
		} finally {
			set({ isLoading: false });
		}
	},

	addNote: async (title: string, time: number) => {
		const url = useVideoStore.getState().currentVideoUrl;
		try {
			set({ isLoading: true });
			const timeOffset = await settingsService.getTimeOffset();
			const adjustedTime = Math.max(0, time - timeOffset);
			await noteService.add({ url, title, time: adjustedTime });
			await get().loadNotes(url);
		} catch {
			toast("Failed to add note", "error");
		} finally {
			set({ isLoading: false });
		}
	},

	removeNote: async (id: number) => {
		const url = useVideoStore.getState().currentVideoUrl;
		try {
			set({ isLoading: true });
			await noteService.remove(id);
			await get().loadNotes(url);
			toast("Note removed");
		} catch {
			toast("Failed to remove note", "error");
		} finally {
			set({ isLoading: false });
		}
	},

	editNote: async (id: number, title: string) => {
		const url = useVideoStore.getState().currentVideoUrl;
		try {
			set({ isLoading: true });
			await noteService.update(id, title);
			await get().loadNotes(url);
		} catch {
			toast("Failed to update note", "error");
		} finally {
			set({ isLoading: false });
		}
	},
}));
