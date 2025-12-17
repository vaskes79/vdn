export interface Note {
	id?: number; // Auto-increment
	url: string; // Foreign key к Video
	title: string; // Текст заметки
	time: number; // Время в секундах
}

export interface NoteInput {
	url: string;
	title: string;
	time: number;
}
