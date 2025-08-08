import { useStore } from "zustand/react";
import { gameSettingsStore } from "@/modules/game/store/game-settings-store";
import { GameModeEnum } from "@/modules/game/enums";
import { GameDailyMode } from "@/modules/game/components/game-daily-mode";
import { useMemo } from "react";
import { GameInfiniteMode } from "@/modules/game/components/game-infinite-mode";
import { GameHeader } from "@/modules/game/components/game-header";

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
    <div className="flex flex-col size-full p-4 gap-2">
      <GameHeader />

      <ViewComponent />
    </div>
  );
}
