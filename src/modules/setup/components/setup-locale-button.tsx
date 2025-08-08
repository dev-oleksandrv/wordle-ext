import type { SetupLocaleButtonConfigType } from "@/modules/setup/types";
import { useTranslations } from "@/modules/intl";
import { CheckIcon } from "lucide-react";
import { cn } from "@/core/utils/tw-utils";

export interface SetupLocaleButtonProps {
  config: SetupLocaleButtonConfigType;
  onSelect: (locale: SetupLocaleButtonConfigType["locale"]) => void;

  isSelected?: boolean;
}

export function SetupLocaleButton({ config, onSelect, isSelected = false }: SetupLocaleButtonProps) {
  const t = useTranslations();

  const handleClick = () => void onSelect(config.locale);

  return (
    <div
      className={cn(
        "flex flex-row items-center border border-gray-200 rounded-lg shadow-md shadow-black/10 px-4 py-3 cursor-pointer box-content hover:bg-emerald-50",
        {
          "bg-emerald-500 text-white border-0 hover:bg-emerald-600": isSelected,
        },
      )}
      role="button"
      onClick={handleClick}
    >
      <div className="flex flex-row flex-1 items-center gap-2">
        <span className="text-lg leading-0">{config.flagEmoji}</span>
        <span>{t(config.translationKey)}</span>
      </div>

      {isSelected && (
        <div className="size-4">
          <CheckIcon className="size-4 text-white" />
        </div>
      )}
    </div>
  );
}
