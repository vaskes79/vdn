import { db } from "@db";
import type { Video, VideoInput } from "@types";

export const videoService = {
  async getAll(): Promise<Video[]> {
    return db.videos.toArray();
  },

  async add(input: VideoInput): Promise<void> {
    await db.videos.add(input);
  },

  async remove(url: string): Promise<void> {
    await db.transaction("rw", [db.videos, db.notes], async () => {
      await db.videos.delete(url);
      await db.notes.where("url").equals(url).delete();
    });
  },

  async update(url: string, title: string): Promise<void> {
    await db.videos.update(url, { title });
  },

  async exists(url: string): Promise<boolean> {
    const video = await db.videos.get(url);
    return !!video;
  },
};
