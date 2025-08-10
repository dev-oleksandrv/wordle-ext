import { useDictionary } from "@/modules/dictionary";
import { LocaleEnum } from "@/modules/intl";
import { useStore } from "zustand/react";
import type { StoreApi } from "zustand/vanilla";
import type { GameBaseBoardState } from "@/modules/game/store/game-base-board-store";
import { useCallback, useState } from "react";
import type { GameAttemptType } from "@/modules/game/types";
import { validateAttempt } from "@/modules/game/utils";
import { GAME_MAX_ATTEMPTS } from "@/modules/game/constants";
import { GameAttemptStatusEnum, GameStatusEnum } from "@/modules/game/enums";
import { useAttemptInput } from "@/modules/game/hooks/use-attempt-input";

export function useBoardManager(locale: LocaleEnum, store: StoreApi<GameBaseBoardState>) {
  const dictionary = useDictionary();
  const state = useStore(store);

  const [isPending, setIsPending] = useState(false);

  const lastAttempt = state.attempts[state.attempts.length - 1];

  const handleAttemptProcess = useCallback(
    async (attempt: GameAttemptType) => {
      setIsPending(true);

      // if (!dictionary.checkWordExists(attempt.chars.map((c) => c.value).join(""), locale)) {
      //   setIsPending(false);
      //   alert("The word does not exist in the dictionary. Please try again.");
      //   return;
      // }

      const validatedAttempt = validateAttempt(state.currentWord, attempt);
      const isLastAttempt = state.attempts.length + 1 === GAME_MAX_ATTEMPTS;
      state.addAttempt(validatedAttempt);
      if (isLastAttempt || validatedAttempt.status === GameAttemptStatusEnum.CORRECT) {
        state.setStatus(GameStatusEnum.FINISHED);
      }

      setIsPending(false);
    },
    [state.currentWord, state.attempts, state.addAttempt, state.setStatus, locale],
  );

  const handleUpdateCurrentWord = useCallback(() => {
    state.setCurrentWord(dictionary.getRandomWord(locale, state.currentWord));
  }, [state.currentWord, state.setCurrentWord, locale]);

  const [currentAttempt, submitAttempt] = useAttemptInput(locale, {
    isPending: isPending,
    onSubmit: handleAttemptProcess,
  });

  return {
    currentAttempt,
    lastAttempt,
    submitAttempt,
    updateCurrentWord: handleUpdateCurrentWord,
    isPending,
    state,
  };
}
