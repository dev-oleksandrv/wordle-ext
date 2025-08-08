import { useCallback } from "react";
import { useStore } from "zustand/react";
import { intlStore } from "@/modules/intl/store";

import translations from "@/modules/intl/translations";
import { findTranslation } from "@/modules/intl/utils";
import { KEY_REGEX } from "@/modules/intl/constants";

export function useTranslations(keyPrefix?: string) {
  const { locale } = useStore(intlStore);

  return useCallback(
    (key: string) => {
      const isKeyPrefixValid = !keyPrefix || keyPrefix.match(KEY_REGEX);
      if (!isKeyPrefixValid) {
        console.warn("Invalid key prefix format. It should match the pattern: parent.child");
      }

      if (!key.match(KEY_REGEX)) {
        console.log(key);
        console.warn("Invalid key format. It should match the pattern: parent.child");
        return key;
      }

      const dictionary = translations[locale];
      if (!dictionary) {
        console.warn(`No translations found for locale: ${locale}. Falling back to default locale.`);
        return key;
      }

      const path = keyPrefix && isKeyPrefixValid ? [keyPrefix, key] : [key];
      const translation = findTranslation(dictionary, path);

      if (translation === null) {
        console.warn(`Translation not found for key: ${keyPrefix}.${key}. Returning the key as fallback.`);
        return key;
      }

      return translation;
    },
    [locale],
  );
}
