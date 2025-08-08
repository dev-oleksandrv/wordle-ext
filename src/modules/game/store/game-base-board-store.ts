import { GameStatusEnum } from "@/modules/game/enums";
import type { GameAttemptType } from "@/modules/game/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ChromeStoragePersistAdapter } from "@/core/adapters/chrome-persist-storage-adapter";
import { LocaleEnum } from "@/modules/intl";

export interface GameBaseBoardState {
  status: GameStatusEnum;
  attempts: GameAttemptType[];
  currentWord: string;

  setStatus: (status: GameStatusEnum) => void;
  addAttempt: (attempt: GameAttemptType) => void;
  setCurrentWord: (word: string) => void;
}

export interface CreateGameBoardStoreOptions {
  storageName: string;
  locale?: LocaleEnum;
}

export function createGameBoardStore({ storageName, locale }: CreateGameBoardStoreOptions) {
  return create<GameBaseBoardState>()(
    persist(
      (set) => ({
        status: GameStatusEnum.NOT_STARTED,
        currentWord: "",
        attempts: [],

        setStatus: (status: GameStatusEnum) => set({ status }),
        addAttempt: (attempt) =>
          set((state) => ({
            attempts: [...state.attempts, attempt],
          })),
        setCurrentWord: (word) =>
          set({
            currentWord: word,
            status: GameStatusEnum.IN_PROGRESS,
            attempts: [],
          }),
      }),
      {
        name: locale ? `${storageName}-${locale}` : storageName,
        partialize: (state) => ({
          status: state.status,
          currentWord: state.currentWord,
          attempts: state.attempts,
        }),
        storage: createJSONStorage(() => new ChromeStoragePersistAdapter()),
      },
    ),
  );
}
