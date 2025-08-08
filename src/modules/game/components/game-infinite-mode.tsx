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
  const { attempts, status, currentWord, setCurrentWord, addAttempt, setStatus } = useStore(
    locale === LocaleEnum.EN ? gameInfiniteBoardENStore : gameInfiniteBoardUKStore,
  );

  const [isPending, setIsPending] = useState(false);

  const handleAttemptProcess = useCallback(
    async (attempt: GameAttemptType) => {
      setIsPending(true);

      const validatedAttempt = validateAttempt(currentWord, attempt);
      const isLastAttempt = attempts.length + 1 === GAME_MAX_ATTEMPTS;
      addAttempt(validatedAttempt);
      if (isLastAttempt || validatedAttempt.status === GameAttemptStatusEnum.CORRECT) {
        setStatus(GameStatusEnum.FINISHED);
      }

      setIsPending(false);
    },
    [currentWord, attempts],
  );

  const handleNextWord = () => setCurrentWord(dictionary.getRandomWord(locale, currentWord));

  const [currentAttempt, submitAttempt] = useAttemptInput(locale, {
    isPending: isPending,
    onSubmit: handleAttemptProcess,
  });

  const lastAttempt = attempts[attempts.length - 1];

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
        onSubmit={submitAttempt}
      />

      {status === GameStatusEnum.FINISHED && <GameResult lastAttempt={lastAttempt} onNextWord={handleNextWord} />}
    </>
  );
}
