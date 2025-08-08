import type { GameAttemptType } from "@/modules/game/types";
import { GAME_MAX_ATTEMPTS } from "@/modules/game/constants";
import { GameAttemptStatusEnum } from "@/modules/game/enums";
import { GameBoardRow } from "@/modules/game/components/game-board-row";

interface GameBoardProps {
  currentAttempt: GameAttemptType;
  attempts: GameAttemptType[];
}

export function GameBoard({ currentAttempt, attempts }: GameBoardProps) {
  const normalizedAttempts: GameAttemptType[] = Array.from({ length: GAME_MAX_ATTEMPTS }, (_, i) => {
    if (i < attempts.length) {
      return attempts[i];
    }

    if (i === attempts.length) {
      return currentAttempt;
    }

    return { chars: [], status: GameAttemptStatusEnum.ACTIVE };
  });

  return (
    <div className="flex-1 grid grid-rows-6 gap-2 px-10">
      {normalizedAttempts.map((attempt, index) => (
        <GameBoardRow key={index} attempt={attempt} isHighlighted={index === attempts.length} />
      ))}
    </div>
  );
}
