import { GameBoardFooter } from "@/modules/game/components/game-board-footer";
import { useEffect } from "react";
import { GameStatusEnum } from "@/modules/game/enums";
import { LocaleEnum, useIntl } from "@/modules/intl";
import { GameBoard } from "@/modules/game/components/game-board";
import { GAME_MAX_WORD_LENGTH } from "@/modules/game/constants";
import { gameInfiniteBoardENStore, gameInfiniteBoardUKStore } from "@/modules/game/store/game-infinite-board-store";
import { GameResult } from "@/modules/game/components/game-result";
import { useBoardManager } from "@/modules/game/hooks/use-board-manager";

export function GameInfiniteMode() {
  const { locale } = useIntl();
  const {
    currentAttempt,
    lastAttempt,
    isPending,
    submitAttempt,
    updateCurrentWord,
    state: { attempts, status },
  } = useBoardManager(locale, locale === LocaleEnum.EN ? gameInfiniteBoardENStore : gameInfiniteBoardUKStore);

  useEffect(() => {
    if (status === GameStatusEnum.NOT_STARTED) {
      updateCurrentWord();
    }
  }, [status]);

  return (
    <>
      <GameBoard currentAttempt={currentAttempt} attempts={attempts} />

      <GameBoardFooter
        isDisabled={currentAttempt.chars.length < GAME_MAX_WORD_LENGTH || isPending}
        onSubmit={submitAttempt}
      />

      {status === GameStatusEnum.FINISHED && <GameResult lastAttempt={lastAttempt} onNextWord={updateCurrentWord} />}
    </>
  );
}
