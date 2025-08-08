import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GameAttemptCharType, GameAttemptType } from "@/modules/game/types";
import { GameAttemptCharStatusEnum, GameAttemptStatusEnum } from "@/modules/game/enums";
import { GAME_KEYBOARD_SPECIAL_KEYS, GAME_MAX_WORD_LENGTH } from "@/modules/game/constants";
import { LocaleEnum } from "@/modules/intl";
import { validateKeyboardInput } from "@/modules/game/utils";

interface UseAttemptInputOptions {
  isPending?: boolean;
  onSubmit?: (attempt: GameAttemptType) => Promise<void>;
}

export function useAttemptInput(locale: LocaleEnum, options: UseAttemptInputOptions = {}) {
  const [chars, setChars] = useState<GameAttemptCharType[]>([]);

  const charsRef = useRef<GameAttemptCharType[]>([]);

  const handleKeyboardInput = useCallback(
    async (ev: KeyboardEvent) => {
      if (options.isPending) {
        return;
      }

      const keyCode = ev.key.toLowerCase();

      if (keyCode === GAME_KEYBOARD_SPECIAL_KEYS.SUBMIT_KEY) {
        if (charsRef.current.length < GAME_MAX_WORD_LENGTH) {
          return;
        }
        if (options.onSubmit) {
          await options.onSubmit({
            chars: [...charsRef.current],
            status: GameAttemptStatusEnum.ACTIVE,
          });

          setChars([]);
        }
        return;
      }

      if (keyCode === GAME_KEYBOARD_SPECIAL_KEYS.DELETE_KEY) {
        setChars((prevState) => {
          if (prevState.length === 0) {
            return prevState;
          }

          return prevState.slice(0, -1);
        });
        return;
      }

      if (validateKeyboardInput(keyCode, locale)) {
        setChars((prevState) => {
          if (prevState.length >= GAME_MAX_WORD_LENGTH) {
            return prevState;
          }

          return [...prevState, { value: keyCode, status: GameAttemptCharStatusEnum.ACTIVE }];
        });
      }
    },
    [locale, options.isPending, options.onSubmit],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardInput);

    return () => {
      window.removeEventListener("keydown", handleKeyboardInput);
    };
  }, [handleKeyboardInput]);

  useEffect(() => {
    charsRef.current = chars;
  }, [chars]);

  return useMemo<GameAttemptType>(
    () => ({
      chars,
      status: GameAttemptStatusEnum.ACTIVE,
    }),
    [chars],
  );
}
