import type { ToastType } from "@store/useToastStore";
import { useToastStore } from "@store/useToastStore";

export function toast(message: string, type: ToastType = "default") {
	useToastStore.getState().add(message, type);
}
