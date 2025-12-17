import Dexie, { type Table } from "dexie";
import type { Video, Note, Setting } from "@types";

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
