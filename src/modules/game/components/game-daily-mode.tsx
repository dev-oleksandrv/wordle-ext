import { GameBoardFooter } from "@/modules/game/components/game-board-footer";
import { useEffect, useRef } from "react";
import { GameStatusEnum } from "@/modules/game/enums";
import { LocaleEnum, useIntl } from "@/modules/intl";
import { GameBoard } from "@/modules/game/components/game-board";
import { GAME_DAILY_START_CHECK_INTERVAL, GAME_DAILY_TIMEOUT, GAME_MAX_WORD_LENGTH } from "@/modules/game/constants";
import { GameDailyResult } from "@/modules/game/components/game-daily-result";
import { gameDailyBoardENStore, gameDailyBoardUKStore } from "@/modules/game/store/game-daily-board-store";
import { useBoardManager } from "@/modules/game/hooks/use-board-manager";

export function GameDailyMode() {
  const { locale } = useIntl();
  const {
    currentAttempt,
    lastAttempt,
    isPending,
    submitAttempt,
    updateCurrentWord,
    state: { attempts, attemptStartedAt, attemptFinishedAt, status, setStatus },
  } = useBoardManager(locale, locale === LocaleEnum.EN ? gameDailyBoardENStore : gameDailyBoardUKStore);

  const dailyStartCheckIntervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const handleReset = () => void setStatus(GameStatusEnum.NOT_STARTED);

  useEffect(() => {
    const now = Date.now();

    if (status === GameStatusEnum.NOT_STARTED) {
      updateCurrentWord();
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
        updateCurrentWord();
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
