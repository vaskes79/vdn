import type { Note, Setting, Video } from "@types";
import Dexie, { type Table } from "dexie";

export class VdnDatabase extends Dexie {
	videos!: Table<Video, string>;
	notes!: Table<Note, number>;
	settings!: Table<Setting, string>;

	constructor() {
		super("VDN");

		this.version(1).stores({
			videos: "url, title",
			notes: "++id, url, time",
			settings: "name",
		});
	}
}

export const db = new VdnDatabase();
