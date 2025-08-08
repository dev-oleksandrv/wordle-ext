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
  },
};

export default TRANSLATIONS;
