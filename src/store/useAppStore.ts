import type { AppStoreActions, AppStoreState } from "@types";
import { create } from "zustand";

type AppStore = AppStoreState & AppStoreActions;

export const useAppStore = create<AppStore>((set) => ({
	// State
	sidebarOpen: false,

	// Actions
	setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
	toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
