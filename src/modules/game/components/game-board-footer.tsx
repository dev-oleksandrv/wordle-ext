import { CheckIcon } from "lucide-react";
import { useTranslations } from "@/modules/intl";

interface GameBoardFooterProps {
  onSubmit: () => void;

  isDisabled?: boolean;
}

export function GameBoardFooter({ onSubmit, isDisabled }: GameBoardFooterProps) {
  const t = useTranslations("game.footer");

  const handleClick = () => void onSubmit();

  return (
    <div className="flex flex-col gap-1">
      <button
        className="flex flex-row justify-center items-center gap-2 rounded-lg shadow-md shadow-black/10 px-2 py-2 cursor-pointer box-content bg-emerald-500 text-white border-0 hover:bg-emerald-600 disabled:opacity-70"
        onClick={handleClick}
        disabled={isDisabled}
      >
        <span>{t("submit-button")}</span>
        <CheckIcon className="size-4" />
      </button>

      <p className="text-center text-xs text-gray-500">{t("helper-text")}</p>
    </div>
  );
}
