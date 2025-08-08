import { LocaleEnum } from "@/modules/intl";
import { EN_LETTER_REGEX, UK_LETTER_REGEX } from "@/modules/game/constants";
import type { GameAttemptCharType, GameAttemptType } from "@/modules/game/types";
import { GameAttemptCharStatusEnum, GameAttemptStatusEnum } from "./enums";

export function validateKeyboardInput(key: string, locale?: LocaleEnum): boolean {
  if (key.length !== 1) {
    return false;
  }

  if (locale === LocaleEnum.EN) {
    return EN_LETTER_REGEX.test(key);
  }

  if (locale === LocaleEnum.UK) {
    return UK_LETTER_REGEX.test(key);
  }

  return true;
}

export function validateAttempt(targetWord: string, attempt: GameAttemptType): GameAttemptType {
  const target = targetWord.toLowerCase();
  const guess = attempt.chars.map((c) => (c.value || "").toLowerCase());

  if (guess.length !== target.length) {
    return {
      chars: attempt.chars.map((c) => ({ ...c, status: GameAttemptCharStatusEnum.ACTIVE })),
      status: GameAttemptStatusEnum.ACTIVE,
    };
  }

  const result: GameAttemptCharType[] = new Array(guess.length);
  const remaining = new Map<string, number>();

  for (let i = 0; i < target.length; i++) {
    const t = target[i];
    const g = guess[i];

    if (g === t) {
      result[i] = { value: attempt.chars[i].value, status: GameAttemptCharStatusEnum.CORRECT };
    } else {
      result[i] = { value: attempt.chars[i].value, status: GameAttemptCharStatusEnum.ACTIVE };
      remaining.set(t, (remaining.get(t) ?? 0) + 1);
    }
  }

  for (let i = 0; i < target.length; i++) {
    if (result[i].status !== GameAttemptCharStatusEnum.ACTIVE) continue;

    const g = guess[i];
    const left = remaining.get(g) ?? 0;

    if (left > 0) {
      result[i].status = GameAttemptCharStatusEnum.WRONG_POSITION;
      remaining.set(g, left - 1);
    } else {
      result[i].status = GameAttemptCharStatusEnum.NOT_IN_WORD;
    }
  }

  const allCorrect = result.every((c) => c.status === GameAttemptCharStatusEnum.CORRECT);

  return {
    chars: result,
    status: allCorrect ? GameAttemptStatusEnum.CORRECT : GameAttemptStatusEnum.INCORRECT,
  };
}
