import { useStore } from "zustand/react";
import { intlStore } from "@/modules/intl/store";
import { isLocaleEnum, LocaleEnum } from "@/modules/intl/locales";

export function useIntl() {
  const { locale, setLocale } = useStore(intlStore);

  const updateLocale = (newLocale: LocaleEnum) => {
    if (!isLocaleEnum(newLocale)) {
      console.warn(`Invalid locale: ${newLocale}. Falling back to default locale.`);
      setLocale(LocaleEnum.EN);
      return;
    }

    setLocale(newLocale);
  };

  return {
    locale,
    setLocale: updateLocale,
  };
}
