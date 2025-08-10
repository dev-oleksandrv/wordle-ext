import { GameAttemptStatusEnum } from "@/modules/game/enums";
import { useEffect, useMemo, useRef, useState } from "react";
import { GAME_DAILY_TIMEOUT } from "@/modules/game/constants";
import { AlarmClockIcon } from "lucide-react";
import { formatSecondsToHHMMSS } from "@/modules/game/utils";
import { useTranslations } from "@/modules/intl";

interface GameDailyResultProps {
  currentWord: string;
  attemptsCount: number;
  lastAttemptStatus: GameAttemptStatusEnum;
  lastAttemptFinishedAt: number;
  onTimerReset?: () => void;
}

export function GameDailyResult({
  currentWord,
  attemptsCount,
  lastAttemptStatus,
  lastAttemptFinishedAt,
  onTimerReset,
}: GameDailyResultProps) {
  const t = useTranslations("game.result");
  const [timer, setTimer] = useState<number>(
    Math.round((lastAttemptFinishedAt + GAME_DAILY_TIMEOUT - Date.now()) / 1000),
  );

  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const formattedTimer = useMemo<string>(() => formatSecondsToHHMMSS(timer), [timer]);

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
    <div className="absolute flex flex-col justify-center items-center top-0 left-0 size-full bg-white/60 z-10">
      <div className="flex flex-col gap-2 w-[280px] p-4 box-border bg-white shadow-sm shadow-black/10 rounded-md">
        {lastAttemptStatus === GameAttemptStatusEnum.INCORRECT && (
          <>
            <p className="text-red-400 text-lg font-bold">{t("failed.title")}</p>
            <p
              dangerouslySetInnerHTML={{
                __html: t("failed.description", {
                  word: currentWord,
                }),
              }}
            />
          </>
        )}

        {lastAttemptStatus === GameAttemptStatusEnum.CORRECT && (
          <>
            <p className="text-emerald-400 text-lg font-bold">{t("success.title")}</p>
            <p
              dangerouslySetInnerHTML={{
                __html: t("success.description", {
                  word: currentWord,
                  attemptsCount: attemptsCount,
                }),
              }}
            />
          </>
        )}

        <div className="mt-4 px-2 py-1 rounded-md shadow-sm shadow-black/10 flex flex-row items-center justify-center bg-emerald-500 text-white gap-2">
          <AlarmClockIcon className="size-5" />

          <span className="font-bold text-lg">{formattedTimer}</span>
        </div>
      </div>
    </div>
  );
}
