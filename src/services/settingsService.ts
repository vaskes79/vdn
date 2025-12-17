import { db } from "@db";
import type { AppSettings } from "@types";

const DEFAULT_SETTINGS: AppSettings = {
  currentVideo: "https://youtu.be/cCOL7MC4Pl0",
  timeOffset: 3,
  exportHtml: true,
  exportMd: true,
  exportTxt: true,
};

export const settingsService = {
  async get<K extends keyof AppSettings>(name: K): Promise<AppSettings[K]> {
    const setting = await db.settings.get(name);
    return (setting?.value as AppSettings[K]) ?? DEFAULT_SETTINGS[name];
  },

  async set<K extends keyof AppSettings>(name: K, value: AppSettings[K]): Promise<void> {
    await db.settings.put({ name, value });
  },

  async getCurrentVideo(): Promise<string> {
    return this.get("currentVideo");
  },

  async setCurrentVideo(url: string): Promise<void> {
    await this.set("currentVideo", url);
  },

  async getTimeOffset(): Promise<number> {
    return this.get("timeOffset");
  },
};
