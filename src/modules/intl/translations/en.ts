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
    result: {
      failed: {
        title: "Better luck next time",
        description:
          "The correct word was <span class='font-bold uppercase'>\"{word}\"</span>. Don't worry, you'll get it next time!",
      },
      success: {
        title: "Word cracked!",
        description:
          "You guessed the word <span class='font-bold uppercase'>\"{word}\"</span> in <span class='font-bold'>{attemptsCount}</span> attempts!",
      },
      "next-word-button": "Next Word",
    },
  },
};

export default TRANSLATIONS;
