import { create } from "zustand";

export type ToastType = "default" | "error";

export interface ToastItem {
	id: number;
	message: string;
	type: ToastType;
}

interface ToastStore {
	toasts: ToastItem[];
	add: (message: string, type?: ToastType) => void;
	remove: (id: number) => void;
}

let nextId = 0;

export const useToastStore = create<ToastStore>((set) => ({
	toasts: [],
	add: (message, type = "default") =>
		set((state) => ({
			toasts: [...state.toasts, { id: nextId++, message, type }],
		})),
	remove: (id) =>
		set((state) => ({
			toasts: state.toasts.filter((t) => t.id !== id),
		})),
}));
