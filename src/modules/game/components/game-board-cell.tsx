import type { GameAttemptCharType } from "@/modules/game/types";
import { cn } from "@/core/utils/tw-utils";
import { GameAttemptCharStatusEnum } from "@/modules/game/enums";

interface GameBoardCellProps {
  char: GameAttemptCharType;
  isHighlighted?: boolean;
}

export function GameBoardCell({ char, isHighlighted }: GameBoardCellProps) {
  return (
    <div
      className={cn(
        "aspect-square flex justify-center items-center box-border border border-gray-200 shadow-sm shadow-black/10 text-2xl font-bold uppercase rounded-md",
        {
          "bg-emerald-400 text-white": char.status === GameAttemptCharStatusEnum.CORRECT,
          "bg-sky-400 text-white": char.status === GameAttemptCharStatusEnum.PARTLY_CORRECT,
          "bg-gray-400": char.status === GameAttemptCharStatusEnum.NOT_IN_WORD,
          "bg-yellow-500 text-white": char.status === GameAttemptCharStatusEnum.WRONG_POSITION,
          "bg-emerald-50": isHighlighted,
        },
      )}
    >
      {char.value}
    </div>
  );
}
