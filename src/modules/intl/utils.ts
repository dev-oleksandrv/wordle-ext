import type { IntlTranslationsDictionaryType } from "@/modules/intl/types";

export function findTranslation(translations: IntlTranslationsDictionaryType, path: string[]): string | null {
  const keys = path.join(".").split(".");

  let current: IntlTranslationsDictionaryType | string = translations;
  while (typeof current !== "string") {
    const key = keys.shift();
    if (!key || !(key in current)) {
      return null;
    }
    current = current[key];
  }

  return current as string;
}
