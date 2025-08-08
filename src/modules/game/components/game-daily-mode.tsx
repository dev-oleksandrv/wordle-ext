import { GameBoardFooter } from "@/modules/game/components/game-board-footer";

export function GameDailyMode() {
  return (
    <>
      <div className="flex-1 bg-red-500" />

      <GameBoardFooter onSubmit={() => {}} />
    </>
  );
}
