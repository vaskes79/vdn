import { toast } from "./toast";

export function getVideoUrlWithTime(url: string, time: number): string {
	const seconds = Math.round(time);

	try {
		const u = new URL(url);
		const segments = u.pathname.split("/").filter(Boolean);

		if (u.hostname.includes("youtube") || u.hostname === "youtu.be") {
			const videoId = u.searchParams.get("v") ?? segments.pop();
			return `https://www.youtube.com/watch?v=${videoId}&t=${seconds}`;
		}

		if (u.hostname.includes("vimeo")) {
			const videoId = segments.pop();
			return `https://vimeo.com/${videoId}#t=${seconds}`;
		}
	} catch (error) {
		toast(`Invalid video URL: ${url}`, "error");
	}

	return url;
}

export function isValidVideoUrl(url: string): boolean {
	try {
		const { hostname } = new URL(url);
		return hostname.includes("youtube") || hostname === "youtu.be" || hostname.includes("vimeo");
	} catch {
		return false;
	}
}
