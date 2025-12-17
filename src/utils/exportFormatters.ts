import type { Note } from "@types";
import { formatTime } from "./formatTime";
import { getVideoUrlWithTime } from "./videoUrl";

export function formatToHtml(notes: Note[]): string {
  const items = notes.map(({ time, title, url }) => {
    const timecode = formatTime(time);
    const videoUrl = getVideoUrlWithTime(url, time);
    return `\t<li><a href="${videoUrl}">${timecode} ${title}</a></li>`;
  });

  return ["<ul>", ...items, "</ul>"].join("\n");
}

export function formatToMarkdown(notes: Note[]): string {
  const lines: string[] = [];
  const links: string[] = [];

  for (const { time, title, url } of notes) {
    const timecode = formatTime(time);
    const videoUrl = getVideoUrlWithTime(url, time);
    lines.push(`- [\`${timecode}\`] ${title}`);
    links.push(`[\`${timecode}\`]: ${videoUrl}`);
  }

  return [...lines, "", ...links].join("\n");
}

export function formatToText(notes: Note[]): string {
  return notes
    .map(({ time, title, url }) => {
      const timecode = formatTime(time);
      const videoUrl = getVideoUrlWithTime(url, time);
      return `${timecode} ${title} ${videoUrl}`;
    })
    .join("\n");
}
