import { useStore } from "zustand/react";
import { routerStore } from "@/modules/router/store";
import { isRouterViewEnum, RouterViewEnum } from "@/modules/router/routes";

export function useRouter() {
  const { currentView, setCurrentView } = useStore(routerStore);

  const updateCurrentView = (view: RouterViewEnum) => {
    if (!isRouterViewEnum(view)) {
      console.warn(`Invalid view: ${view}`);
      return;
    }

    setCurrentView(view);
  };

  return {
    currentView,
    setCurrentView: updateCurrentView,
  };
}
