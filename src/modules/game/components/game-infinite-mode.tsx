import { GameBoardFooter } from "@/modules/game/components/game-board-footer";

export function GameInfiniteMode() {
  return (
    <>
      <div className="flex-1 bg-blue-500" />

      <GameBoardFooter onSubmit={() => {}} />
    </>
  );
}
