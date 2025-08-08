import { useTranslations } from "@/modules/intl";
import type { GameModeButtonConfigType } from "@/modules/game/types";
import { cn } from "@/core/utils/tw-utils";

export interface GameHeaderTabProps {
  config: GameModeButtonConfigType;
  onSelect: (mode: GameModeButtonConfigType["mode"]) => void;

  isSelected?: boolean;
}

export function GameHeaderTabsItem({ config, onSelect, isSelected }: GameHeaderTabProps) {
  const t = useTranslations();

  const handleClick = () => void onSelect(config.mode);

  return (
    <button
      className={cn("h-full px-2 flex items-center justify-center cursor-pointer bg-zinc-100 hover:bg-emerald-50", {
        "bg-emerald-500 hover:bg-emerald-600 text-white": isSelected,
      })}
      onClick={handleClick}
    >
      <span className="text-xs">{t(config.translationKey)}</span>
    </button>
  );
}
