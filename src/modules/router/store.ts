import { create } from "zustand";
import { RouterViewEnum } from "./routes";
import { createJSONStorage, persist } from "zustand/middleware";
import { ChromeStoragePersistAdapter } from "@/core/adapters/chrome-persist-storage-adapter";

export interface RouterStateType {
  currentView: RouterViewEnum;
  setCurrentView: (view: RouterViewEnum) => void;
}

export const routerStore = create<RouterStateType>()(
  persist(
    (set) => ({
      currentView: RouterViewEnum.SETUP,
      setCurrentView: (view: RouterViewEnum) => set(() => ({ currentView: view })),
    }),
    {
      name: "wordle-ext-router-store",
      partialize: (state) => ({ currentView: state.currentView }),
      storage: createJSONStorage(() => new ChromeStoragePersistAdapter()),
    },
  ),
);
