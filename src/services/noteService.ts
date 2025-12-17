import { db } from '@db';
import type { Note, NoteInput } from '@types';

export const noteService = {
	async getByUrl(url: string): Promise<Note[]> {
		return db.notes.where('url').equals(url).sortBy('time');
	},

	async getAll(): Promise<Note[]> {
		return db.notes.toArray();
	},

	async add(input: NoteInput): Promise<number> {
		return db.notes.add(input as Note);
	},

	async remove(id: number): Promise<void> {
		await db.notes.delete(id);
	},

	async update(id: number, title: string): Promise<void> {
		await db.notes.update(id, { title });
	},
};

