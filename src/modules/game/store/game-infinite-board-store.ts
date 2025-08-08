import { createGameBoardStore } from "@/modules/game/store/game-base-board-store";
import { LocaleEnum } from "@/modules/intl";

export const gameInfiniteBoardENStore = createGameBoardStore({
  storageName: "wordle-ext-game-infinite-board-store",
  locale: LocaleEnum.EN,
});

export const gameInfiniteBoardUKStore = createGameBoardStore({
  storageName: "wordle-ext-game-infinite-board-store",
  locale: LocaleEnum.UK,
});
