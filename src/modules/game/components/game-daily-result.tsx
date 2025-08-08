import type { GameAttemptType } from "@/modules/game/types";
import { GameAttemptStatusEnum } from "@/modules/game/enums";
import { useEffect, useRef, useState } from "react";
import { GAME_DAILY_TIMEOUT } from "@/modules/game/constants";

interface GameDailyResultProps {
  lastAttempt: GameAttemptType;
  lastAttemptFinishedAt: number;
  onTimerReset?: () => void;
}

export function GameDailyResult({ lastAttempt, lastAttemptFinishedAt, onTimerReset }: GameDailyResultProps) {
  const [timer, setTimer] = useState<number>(
    Math.round((lastAttemptFinishedAt + GAME_DAILY_TIMEOUT - Date.now()) / 1000),
  );

  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (timer <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTimer(0);
      if (onTimerReset) onTimerReset();
    }
  }, [timer]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="absolute flex flex-col justify-center items-center top-0 left-0 size-full bg-white/80 z-10">
      {lastAttempt.status === GameAttemptStatusEnum.INCORRECT && (
        <>
          <p className="text-red-500 text-lg font-bold">Failed</p>
        </>
      )}

      {lastAttempt.status === GameAttemptStatusEnum.CORRECT && (
        <>
          <p className="text-emerald-500 text-lg font-bold">Success</p>
        </>
      )}

      <div>
        <p>Next attempt in: {timer} seconds</p>
      </div>
    </div>
  );
}
