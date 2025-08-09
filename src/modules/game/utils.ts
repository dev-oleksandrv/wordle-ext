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

  const n = target.length;
  const result: GameAttemptCharType[] = new Array(n);

  const tCount = new Map<string, number>();
  const gCount = new Map<string, number>();
  const correctCount = new Map<string, number>();

  const correctIdxByLetter = new Map<string, number[]>();
  const unresolvedIdx: number[] = [];

  for (let i = 0; i < n; i++) {
    const t = target[i];
    const g = guess[i];

    tCount.set(t, (tCount.get(t) ?? 0) + 1);
    gCount.set(g, (gCount.get(g) ?? 0) + 1);

    if (g === t) {
      result[i] = { value: attempt.chars[i].value, status: GameAttemptCharStatusEnum.CORRECT };
      correctCount.set(g, (correctCount.get(g) ?? 0) + 1);
      const arr = correctIdxByLetter.get(g);
      if (arr) arr.push(i);
      else correctIdxByLetter.set(g, [i]);
    } else {
      result[i] = { value: attempt.chars[i].value, status: GameAttemptCharStatusEnum.ACTIVE };
      unresolvedIdx.push(i);
    }
  }

  const remaining = new Map<string, number>();
  for (const [letter, cnt] of tCount) {
    remaining.set(letter, cnt - (correctCount.get(letter) ?? 0));
  }

  for (const i of unresolvedIdx) {
    const g = guess[i];
    const left = remaining.get(g) ?? 0;
    if (left > 0) {
      result[i].status = GameAttemptCharStatusEnum.WRONG_POSITION;
      remaining.set(g, left - 1);
    } else {
      result[i].status = GameAttemptCharStatusEnum.NOT_IN_WORD;
    }
  }

  for (const [letter, tCnt] of tCount) {
    const deficit = tCnt - (gCount.get(letter) ?? 0);
    if (deficit > 0) {
      const idxs = correctIdxByLetter.get(letter) ?? [];
      for (let k = 0; k < deficit && k < idxs.length; k++) {
        const idx = idxs[k];
        result[idx].status = GameAttemptCharStatusEnum.PARTLY_CORRECT;
      }
    }
  }

  const allCorrect = result.every((c) => c.status === GameAttemptCharStatusEnum.CORRECT);

  return {
    chars: result,
    status: allCorrect ? GameAttemptStatusEnum.CORRECT : GameAttemptStatusEnum.INCORRECT,
  };
}
