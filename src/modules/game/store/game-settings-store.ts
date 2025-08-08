import { GameModeEnum } from "@/modules/game/enums";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ChromeStoragePersistAdapter } from "@/core/adapters/chrome-persist-storage-adapter";

export interface GameSettingsStateType {
  mode: GameModeEnum;
  setMode: (mode: GameModeEnum) => void;
}

export const gameSettingsStore = create<GameSettingsStateType>()(
  persist(
    (set) => ({
      mode: GameModeEnum.DAILY,
      setMode: (mode: GameModeEnum) => set(() => ({ mode })),
    }),
    {
      name: "wordle-ext-game-settings-store",
      partialize: (state) => ({ mode: state.mode }),
      storage: createJSONStorage(() => new ChromeStoragePersistAdapter()),
    },
  ),
);
