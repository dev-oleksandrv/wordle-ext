import { LocaleEnum } from "@/modules/intl";
import type { SetupLocaleButtonConfigType } from "@/modules/setup/types";

export const SETUP_LOCALE_BUTTON_CONFIG_LIST: SetupLocaleButtonConfigType[] = [
  { locale: LocaleEnum.EN, translationKey: "locales.en", flagEmoji: "🇬🇧" },
  { locale: LocaleEnum.UK, translationKey: "locales.uk", flagEmoji: "🇺🇦" },
];
