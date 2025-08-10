import { GameAttemptStatusEnum } from "@/modules/game/enums";
import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "@/modules/intl";

interface GameResultProps {
  currentWord: string;
  attemptsCount: number;
  lastAttemptStatus: GameAttemptStatusEnum;
  onNextWord?: () => void;
}

export function GameInfiniteResult({ currentWord, attemptsCount, lastAttemptStatus, onNextWord }: GameResultProps) {
  const t = useTranslations("game.result");

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

        <button
          className="mt-4 flex flex-row justify-center items-center gap-2 rounded-lg shadow-md shadow-black/10 px-2 py-2 cursor-pointer box-content bg-emerald-500 text-white border-0 hover:bg-emerald-600 disabled:opacity-70"
          onClick={onNextWord}
        >
          <span>{t("next-word-button")}</span>
          <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
