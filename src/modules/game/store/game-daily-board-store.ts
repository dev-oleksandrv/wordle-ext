import { createGameBoardStore } from "@/modules/game/store/game-base-board-store";
import { LocaleEnum } from "@/modules/intl";

export const gameDailyBoardENStore = createGameBoardStore({
  storageName: "wordle-ext-game-daily-board-store",
  locale: LocaleEnum.EN,
});

export const gameDailyBoardUKStore = createGameBoardStore({
  storageName: "wordle-ext-game-daily-board-store",
  locale: LocaleEnum.UK,
});
