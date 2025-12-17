import { create } from "zustand";
import { noteService, settingsService } from "@services";
import { useVideoStore } from "./useVideoStore";
import type { NotesStoreState, NotesStoreActions } from "@types";

type NotesStore = NotesStoreState & NotesStoreActions;

export const useNotesStore = create<NotesStore>((set, get) => ({
	// State
	notes: [],

	// Actions
	loadNotes: async (url: string) => {
		const notes = await noteService.getByUrl(url);
		set({ notes });
	},

	addNote: async (title: string, time: number) => {
		const url = useVideoStore.getState().currentVideoUrl;
		const timeOffset = await settingsService.getTimeOffset();
		const adjustedTime = Math.max(0, time - timeOffset);

		await noteService.add({ url, title, time: adjustedTime });
		await get().loadNotes(url);
	},

	removeNote: async (id: number) => {
		const url = useVideoStore.getState().currentVideoUrl;
		await noteService.remove(id);
		await get().loadNotes(url);
	},

	editNote: async (id: number, title: string) => {
		const url = useVideoStore.getState().currentVideoUrl;
		await noteService.update(id, title);
		await get().loadNotes(url);
	},
}));

