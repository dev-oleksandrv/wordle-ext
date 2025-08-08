import type { IntlTranslationsDictionaryType } from "@/modules/intl/types";

const TRANSLATIONS: IntlTranslationsDictionaryType = {
  setup: {
    title: "Choose your language",
    description: "The language will be persisted. You can change it any time.",
    "save-changes": "Save changes",
  },
  locales: {
    en: "English",
    uk: "Ukrainian",
  },
  game: {
    tabs: {
      "daily-challenge": "Daily Challenge",
      "infinite-mode": "Infinite Mode",
    },
    footer: {
      "submit-button": "Submit Attempt",
      "helper-text": "or press 'Enter' to submit",
    },
  },
};

export default TRANSLATIONS;
