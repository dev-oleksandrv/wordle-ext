import type { GameModeButtonConfigType } from "@/modules/game/types";
import { GameModeEnum } from "@/modules/game/enums";

export const GAME_MODE_BUTTON_CONFIG_LIST: GameModeButtonConfigType[] = [
  { mode: GameModeEnum.DAILY, translationKey: "game.tabs.daily-challenge" },
  { mode: GameModeEnum.INFINITE, translationKey: "game.tabs.infinite-mode" },
];

export const GAME_MAX_WORD_LENGTH = 5;
export const GAME_MAX_ATTEMPTS = 6;

export const GAME_KEYBOARD_SPECIAL_KEYS = {
  SUBMIT_KEY: "enter",
  DELETE_KEY: "backspace",
};

export const EN_LETTER_REGEX = /^[A-Za-z]$/;

export const UK_LETTER_REGEX =
  /^[\u0410-\u0429\u042C\u042E\u042F\u0490\u0404\u0406\u0407\u0430-\u0449\u044C\u044E\u044F\u0491\u0454\u0456\u0457]$/u;

export const GAME_DAILY_TIMEOUT = 1000 * 60 * 60 * 24;
export const GAME_DAILY_START_CHECK_INTERVAL = 1000 * 2;
