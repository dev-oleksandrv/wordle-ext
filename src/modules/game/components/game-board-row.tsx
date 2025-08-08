import type { GameAttemptType } from "@/modules/game/types";
import { GAME_MAX_WORD_LENGTH } from "@/modules/game/constants";
import { GameAttemptCharStatusEnum } from "@/modules/game/enums";
import { GameBoardCell } from "@/modules/game/components/game-board-cell";

interface GameBoardRowProps {
  attempt: GameAttemptType;
  isHighlighted?: boolean;
}

export function GameBoardRow({ attempt, isHighlighted }: GameBoardRowProps) {
  const normalizedChars = Array.from(
    { length: GAME_MAX_WORD_LENGTH },
    (_, index) => attempt.chars[index] || { char: "", status: GameAttemptCharStatusEnum.ACTIVE },
  );

  return (
    <div className="grid grid-cols-5 gap-2">
      {normalizedChars.map((char, index) => (
        <GameBoardCell key={index} char={char} isHighlighted={isHighlighted} />
      ))}
    </div>
  );
}
