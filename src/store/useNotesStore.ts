import { noteService, settingsService } from "@services";
import type { NotesStoreActions, NotesStoreState } from "@types";
import { toast } from "@utils/toast";
import { create } from "zustand";
import { useVideoStore } from "./useVideoStore";

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
		toast("Note removed");
	},

	editNote: async (id: number, title: string) => {
		const url = useVideoStore.getState().currentVideoUrl;
		await noteService.update(id, title);
		await get().loadNotes(url);
	},
}));
