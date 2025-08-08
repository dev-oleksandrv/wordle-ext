import type { GameModeButtonConfigType } from "@/modules/game/types";
import { GameModeEnum } from "@/modules/game/enums";

export const GAME_MODE_BUTTON_CONFIG_LIST: GameModeButtonConfigType[] = [
  { mode: GameModeEnum.DAILY, translationKey: "game.tabs.daily-challenge" },
  { mode: GameModeEnum.INFINITE, translationKey: "game.tabs.infinite-mode" },
];
