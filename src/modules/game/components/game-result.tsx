import type { GameAttemptType } from "@/modules/game/types";
import { GameAttemptStatusEnum } from "@/modules/game/enums";
import { ArrowRightIcon } from "lucide-react";

interface GameResultProps {
  lastAttempt: GameAttemptType;
  onNextWord?: () => void;
}

export function GameResult({ lastAttempt, onNextWord }: GameResultProps) {
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

      <button
        className="flex flex-row justify-center items-center gap-2 rounded-lg shadow-md shadow-black/10 px-2 py-2 cursor-pointer box-content bg-emerald-500 text-white border-0 hover:bg-emerald-600 disabled:opacity-70"
        onClick={onNextWord}
      >
        <span>Next Word</span>
        <ArrowRightIcon className="size-4" />
      </button>
    </div>
  );
}
