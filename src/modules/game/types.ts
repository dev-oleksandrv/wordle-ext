import { GameAttemptCharStatusEnum, GameAttemptStatusEnum, GameModeEnum } from "@/modules/game/enums";

export interface GameModeButtonConfigType {
  mode: GameModeEnum;
  translationKey: string;
}

export interface GameAttemptCharType {
  value: string;
  status: GameAttemptCharStatusEnum;
}

export interface GameAttemptType {
  chars: GameAttemptCharType[];
  status: GameAttemptStatusEnum;
}
