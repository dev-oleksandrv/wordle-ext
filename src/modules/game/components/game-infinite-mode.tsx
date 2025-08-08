import { GameBoardFooter } from "@/modules/game/components/game-board-footer";
import { useStore } from "zustand/react";
import { useCallback, useEffect, useState } from "react";
import { GameAttemptStatusEnum, GameStatusEnum } from "@/modules/game/enums";
import { Dictionary } from "@/modules/dictionary";
import { LocaleEnum, useIntl } from "@/modules/intl";
import { GameBoard } from "@/modules/game/components/game-board";
import { useAttemptInput } from "@/modules/game/hooks/use-attempt-input";
import type { GameAttemptType } from "@/modules/game/types";
import { GAME_MAX_ATTEMPTS, GAME_MAX_WORD_LENGTH } from "@/modules/game/constants";
import { validateAttempt } from "@/modules/game/utils";
import { gameInfiniteBoardENStore, gameInfiniteBoardUKStore } from "@/modules/game/store/game-infinite-board-store";
import { GameResult } from "@/modules/game/components/game-result";

interface GameInfiniteModeProps {
  dictionary: Dictionary;
}

export function GameInfiniteMode({ dictionary }: GameInfiniteModeProps) {
  const { locale } = useIntl();
  const { attempts, status, currentWord, setCurrentWord, addAttempt } = useStore(
    locale === LocaleEnum.EN ? gameInfiniteBoardENStore : gameInfiniteBoardUKStore,
  );

  const [isPending, setIsPending] = useState(false);

  const handleAttemptSubmit = useCallback(
    async (attempt: GameAttemptType) => {
      setIsPending(true);
      addAttempt(validateAttempt(currentWord, attempt));
      setIsPending(false);
    },
    [currentWord, attempts],
  );

  const handleFooterSubmit = () => handleAttemptSubmit(currentAttempt);

  const handleNextWord = () => setCurrentWord(dictionary.getRandomWord(locale, currentWord));

  const currentAttempt = useAttemptInput(locale, {
    isPending: isPending,
    onSubmit: handleAttemptSubmit,
  });

  const lastAttempt = attempts[attempts.length - 1];

  const isFinished = attempts.length === GAME_MAX_ATTEMPTS || lastAttempt?.status === GameAttemptStatusEnum.CORRECT;

  useEffect(() => {
    if (status === GameStatusEnum.NOT_STARTED) {
      setCurrentWord(dictionary.getRandomWord(locale, currentWord));
    }
  }, [status]);

  return (
    <>
      <GameBoard currentAttempt={currentAttempt} attempts={attempts} />

      <GameBoardFooter
        isDisabled={currentAttempt.chars.length < GAME_MAX_WORD_LENGTH || isPending}
        onSubmit={handleFooterSubmit}
      />

      {isFinished && <GameResult lastAttempt={lastAttempt} onNextWord={handleNextWord} />}
    </>
  );
}
