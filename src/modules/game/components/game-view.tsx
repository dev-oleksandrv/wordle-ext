import { useStore } from "zustand/react";
import { gameSettingsStore } from "@/modules/game/store/game-settings-store";
import { GameModeEnum } from "@/modules/game/enums";
import { GameDailyMode } from "@/modules/game/components/game-daily-mode";
import { useMemo } from "react";
import { GameInfiniteMode } from "@/modules/game/components/game-infinite-mode";
import { GameHeader } from "@/modules/game/components/game-header";
import { DictionaryContextProvider } from "@/modules/dictionary";

export function GameView() {
  const mode = useStore(gameSettingsStore, (state) => state.mode);

  const ViewComponent = useMemo(() => {
    switch (mode) {
      case GameModeEnum.DAILY:
        return GameDailyMode;
      case GameModeEnum.INFINITE:
      default:
        return GameInfiniteMode;
    }
  }, [mode]);

  return (
    <DictionaryContextProvider>
      <div className="flex flex-col size-full p-4 gap-4">
        <GameHeader />

        <div className="flex flex-col gap-4 flex-1 relative overflow-hidden">
          <ViewComponent />
        </div>
      </div>
    </DictionaryContextProvider>
  );
}
