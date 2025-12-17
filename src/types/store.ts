import type { Note, Video } from "@types";

// Интерфейсы для store - UI зависит только от них
export interface VideoStoreState {
	currentVideoUrl: string;
	isPlaying: boolean;
	videos: Video[];
}

export interface VideoStoreActions {
	setCurrentVideo: (url: string) => Promise<void>;
	setPlaying: (playing: boolean) => void;
	loadVideos: () => Promise<void>;
	addVideo: (url: string, title: string) => Promise<void>;
	removeVideo: (url: string) => Promise<void>;
	editVideo: (url: string, title: string) => Promise<void>;
}

export interface NotesStoreState {
	notes: Note[];
}

export interface NotesStoreActions {
	loadNotes: (url: string) => Promise<void>;
	addNote: (title: string, time: number) => Promise<void>;
	removeNote: (id: number) => Promise<void>;
	editNote: (id: number, title: string) => Promise<void>;
}

export interface AppStoreState {
	sidebarOpen: boolean;
}

export interface AppStoreActions {
	setSidebarOpen: (open: boolean) => void;
	toggleSidebar: () => void;
}
