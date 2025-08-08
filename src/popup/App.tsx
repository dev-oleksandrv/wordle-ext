import { RouterViewEnum, useRouter } from "@/modules/router";
import { useMemo } from "react";
import { SetupView } from "@/modules/setup";
import { GameView } from "@/modules/game";

export default function App() {
  const { currentView } = useRouter();

  const ViewComponent = useMemo(() => {
    switch (currentView) {
      case RouterViewEnum.GAME:
        return GameView;
      case RouterViewEnum.SETUP:
      default:
        return SetupView;
    }
  }, [currentView]);

  return <ViewComponent />;
}
