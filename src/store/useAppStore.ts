import { create } from "zustand";
import type { AppStoreState, AppStoreActions } from "@types";

type AppStore = AppStoreState & AppStoreActions;

export const useAppStore = create<AppStore>((set) => ({
  // State
  sidebarOpen: false,

  // Actions
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
