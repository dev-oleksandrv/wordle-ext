import { GameBoardFooter } from "@/modules/game/components/game-board-footer";
import { useStore } from "zustand/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GameAttemptStatusEnum, GameStatusEnum } from "@/modules/game/enums";
import { Dictionary } from "@/modules/dictionary";
import { LocaleEnum, useIntl } from "@/modules/intl";
import { GameBoard } from "@/modules/game/components/game-board";
import { useAttemptInput } from "@/modules/game/hooks/use-attempt-input";
import type { GameAttemptType } from "@/modules/game/types";
import {
  GAME_DAILY_START_CHECK_INTERVAL,
  GAME_DAILY_TIMEOUT,
  GAME_MAX_ATTEMPTS,
  GAME_MAX_WORD_LENGTH,
} from "@/modules/game/constants";
import { validateAttempt } from "@/modules/game/utils";
import { GameDailyResult } from "@/modules/game/components/game-daily-result";
import { gameDailyBoardENStore, gameDailyBoardUKStore } from "@/modules/game/store/game-daily-board-store";

interface GameDailyModeProps {
  dictionary: Dictionary;
}

export function GameDailyMode({ dictionary }: GameDailyModeProps) {
  const { locale } = useIntl();
  const { attempts, attemptFinishedAt, attemptStartedAt, status, currentWord, setCurrentWord, addAttempt, setStatus } =
    useStore(locale === LocaleEnum.EN ? gameDailyBoardENStore : gameDailyBoardUKStore);

  const [isPending, setIsPending] = useState(false);

  const dailyStartCheckIntervalRef = useRef<ReturnType<typeof setInterval>>(null);

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

  const [currentAttempt, submitAttempt] = useAttemptInput(locale, {
    isPending: isPending,
    onSubmit: handleAttemptProcess,
  });

  const lastAttempt = attempts[attempts.length - 1];

  const handleReset = () => {
    setStatus(GameStatusEnum.NOT_STARTED);
  };

  useEffect(() => {
    const now = Date.now();

    if (status === GameStatusEnum.NOT_STARTED) {
      setCurrentWord(dictionary.getRandomWord(locale, currentWord));
      return;
    }

    if (
      attemptFinishedAt !== null &&
      now - attemptFinishedAt > GAME_DAILY_TIMEOUT &&
      status === GameStatusEnum.FINISHED
    ) {
      setStatus(GameStatusEnum.NOT_STARTED);
      return;
    }
  }, [status]);

  useEffect(() => {
    dailyStartCheckIntervalRef.current = setInterval(() => {
      const now = Date.now();
      if (
        attemptStartedAt !== null &&
        now - attemptStartedAt > GAME_DAILY_TIMEOUT &&
        status === GameStatusEnum.IN_PROGRESS
      ) {
        setCurrentWord(dictionary.getRandomWord(locale, currentWord));
        return;
      }
    }, GAME_DAILY_START_CHECK_INTERVAL);

    return () => {
      if (dailyStartCheckIntervalRef.current) {
        clearInterval(dailyStartCheckIntervalRef.current);
      }
    };
  }, [attemptStartedAt, status]);

  return (
    <>
      <GameBoard currentAttempt={currentAttempt} attempts={attempts} />

      <GameBoardFooter
        isDisabled={currentAttempt.chars.length < GAME_MAX_WORD_LENGTH || isPending}
        onSubmit={submitAttempt}
      />

      {status === GameStatusEnum.FINISHED && attemptFinishedAt !== null && (
        <GameDailyResult
          lastAttempt={lastAttempt}
          lastAttemptFinishedAt={attemptFinishedAt}
          onTimerReset={handleReset}
        />
      )}
    </>
  );
}
