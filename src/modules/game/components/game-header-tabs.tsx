import { useStore } from "zustand/react";
import { gameSettingsStore } from "@/modules/game/store/game-settings-store";
import { GAME_MODE_BUTTON_CONFIG_LIST } from "@/modules/game/constants";
import { GameHeaderTabsItem } from "@/modules/game/components/game-header-tabs-item";
import { GameModeEnum } from "@/modules/game/enums";

export function GameHeaderTabs() {
  const { mode, setMode } = useStore(gameSettingsStore);

  const handleSelectMode = (selectedMode: GameModeEnum) => void setMode(selectedMode);

  return (
    <div className="flex flex-row rounded-md shadow-md shadow-black/10 h-8 overflow-hidden">
      {GAME_MODE_BUTTON_CONFIG_LIST.map((btnCfg) => (
        <GameHeaderTabsItem
          key={btnCfg.mode}
          config={btnCfg}
          isSelected={mode === btnCfg.mode}
          onSelect={handleSelectMode}
        />
      ))}
    </div>
  );
}
