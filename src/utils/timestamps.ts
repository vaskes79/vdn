export interface ParsedTimestamp {
	time: number;
	title: string;
}

export function extractYoutubeId(url: string): string | null {
	try {
		const u = new URL(url);
		if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
		if (u.hostname === "youtu.be") return u.pathname.split("/")[1]?.split("?")[0] ?? null;
	} catch {}
	return null;
}

export function parseTimestamps(text: string): ParsedTimestamp[] {
	const regex = /^[\t ]*(\d{1,2}:\d{2}(?::\d{2})?)[\t \-–—|:]+(.+)/gm;
	const results: ParsedTimestamp[] = [];

	for (const match of text.matchAll(regex)) {
		const parts = match[1].split(":").map(Number);
		const seconds =
			parts.length === 3
				? parts[0] * 3600 + parts[1] * 60 + parts[2]
				: parts[0] * 60 + parts[1];
		const title = match[2].trim();
		if (title) results.push({ time: seconds, title });
	}

	return results;
}
