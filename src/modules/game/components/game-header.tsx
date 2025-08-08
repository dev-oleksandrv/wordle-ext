import { Logo } from "@/core/components/logo";
import { GlobeIcon } from "lucide-react";
import { RouterViewEnum, useRouter } from "@/modules/router";
import { GameHeaderTabs } from "@/modules/game/components/game-header-tabs";

export function GameHeader() {
  const { setCurrentView } = useRouter();

  const handleLocaleChange = () => void setCurrentView(RouterViewEnum.SETUP);

  return (
    <div className="flex-none h-8 flex flex-row items-center">
      <Logo />

      <div className="flex flex-row flex-1 justify-end items-center gap-2">
        <GameHeaderTabs />

        <button
          className="flex justify-center items-center size-8 border border-gray-200 rounded-md shadow-md shadow-black/10 bg-white hover:bg-emerald-50 cursor-pointer"
          onClick={handleLocaleChange}
        >
          <GlobeIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
