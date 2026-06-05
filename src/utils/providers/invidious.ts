import { extractYoutubeId, parseTimestamps } from "@utils/timestamps";
import type { ParsedTimestamp } from "@utils/timestamps";

// Status: BROKEN — most public Invidious instances have disabled their API.
// See issue #72 for context and the plan for a replacement provider.
export interface DescriptionProvider {
	fetchTimestamps(url: string): Promise<ParsedTimestamp[]>;
}

const INSTANCES = [
	"https://inv.nadeko.net",
	"https://invidious.nerdvpn.de",
	"https://invidious.privacyredirect.com",
];

export const invidiousProvider: DescriptionProvider = {
	async fetchTimestamps(url) {
		const videoId = extractYoutubeId(url);
		if (!videoId) return [];

		for (const instance of INSTANCES) {
			try {
				const res = await fetch(`${instance}/api/v1/videos/${videoId}?fields=description`, {
					signal: AbortSignal.timeout(5000),
				});
				if (!res.ok) continue;
				const data = await res.json();
				if (!data.description) return [];
				return parseTimestamps(data.description);
			} catch {
				continue;
			}
		}

		return [];
	},
};
