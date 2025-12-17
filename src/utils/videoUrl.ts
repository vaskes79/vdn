export function getVideoUrlWithTime(url: string, time: number): string {
	const seconds = Math.round(time);

	if (url.includes("youtu")) {
		const videoId = url.split("be/")[1] || url.split("v=")[1]?.split("&")[0];
		return `https://www.youtube.com/watch?t=${seconds}&v=${videoId}`;
	}

	if (url.includes("vimeo")) {
		const videoId = url.split("com/")[1];
		return `https://vimeo.com/${videoId}#t=${seconds}`;
	}

	return url;
}

export function isValidVideoUrl(url: string): boolean {
	return /youtu\.?be|vimeo/.test(url);
}

