import type { IntlTranslationsDictionaryType } from "@/modules/intl/types";

const TRANSLATIONS: IntlTranslationsDictionaryType = {
  setup: {
    title: "Виберіть вашу мову",
    description: "Мова буде збережена. Ви можете змінити її в будь-який час.",
    "save-changes": "Зберегти зміни",
  },
  locales: {
    en: "Англійська",
    uk: "Українська",
  },
  game: {
    tabs: {
      "daily-challenge": "Щоденний виклик",
      "infinite-mode": "Безкінечний",
    },
    footer: {
      "submit-button": "Підтвердити спробу",
      "helper-text": "або натисніть 'Enter' для підтвердження",
    },
    result: {
      failed: {
        title: "Невдала спроба",
        description:
          "Правильне слово було <span class='font-bold uppercase'>\"{word}\"</span>. Не хвилюйтеся, ви впораєтеся наступного разу!",
      },
      success: {
        title: "Слово розгадано!",
        description:
          "Ви вгадали слово <span class='font-bold uppercase'>\"{word}\"</span> за <span class='font-bold'>{attemptsCount}</span> спроб!",
      },
      "next-word-button": "Наступне слово",
    },
  },
};

export default TRANSLATIONS;
