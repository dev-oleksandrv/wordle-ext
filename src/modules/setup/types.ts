import { LocaleEnum } from "@/modules/intl";

export interface SetupLocaleButtonConfigType {
  locale: LocaleEnum;
  translationKey: string;
  flagEmoji?: string;
}
