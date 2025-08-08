import { create } from "zustand";
import { LocaleEnum } from "@/modules/intl/locales";
import { createJSONStorage, persist } from "zustand/middleware";
import { ChromeStoragePersistAdapter } from "@/core/adapters/chrome-persist-storage-adapter";

export interface IntlStateType {
  locale: LocaleEnum;
  setLocale: (locale: LocaleEnum) => void;
}

export const intlStore = create<IntlStateType>()(
  persist(
    (set) => ({
      locale: LocaleEnum.EN,
      setLocale: (locale: LocaleEnum) => set(() => ({ locale })),
    }),
    {
      name: "wordle-ext-intl-store",
      partialize: (state) => ({ locale: state.locale }),
      storage: createJSONStorage(() => new ChromeStoragePersistAdapter()),
    },
  ),
);
