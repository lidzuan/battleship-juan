import { useState } from "react";
import { Cell, GameStage, Ship } from "../../types/types";
import { isValidPlacement, placeShip, renderCPUBoard } from "../../utils/board-utils";
import PlayerBoard from "../Board/PlayerBoard";
import ShipButtons from "../ShipButtons/ShipButtons";
import stageStyles from "./ShipPlacementStage.module.css";

interface ShipPlacementStageProps {
  setGameStage: (stage: GameStage) => void;
  playerBoard: Cell[][];
  setPlayerBoard: (board: Cell[][]) => void;
  cpuBoard: Cell[][];
  setCpuBoard: (board: Cell[][]) => void;
}

function ShipPlacementStage({
  setGameStage,
  playerBoard,
  setPlayerBoard,
  cpuBoard,
  setCpuBoard,
}: ShipPlacementStageProps) {
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [placedShips, setPlacedShips] = useState<Ship[]>([]);

  const handleStartBattle = () => {
    setCpuBoard(renderCPUBoard(cpuBoard));
    setGameStage(GameStage.Battle);
  };

  const playerCellClick = (rowIndex: number, colIndex: number, isHorizontal: boolean) => {
    if (selectedShip && isValidPlacement(playerBoard, selectedShip, rowIndex, colIndex, isHorizontal)) {
      setPlayerBoard(placeShip(playerBoard, selectedShip, rowIndex, colIndex, isHorizontal));
      setPlacedShips([...placedShips, selectedShip]);
      setSelectedShip(null);
    }
  };

  return (
    <>
      <div className={stageStyles.gridContainer}>
        <div className={stageStyles.boardGrid}>
          <p>Your Board</p>
          <PlayerBoard playerBoard={playerBoard} selectedShip={selectedShip} playerCellClick={playerCellClick} />
        </div>
        <div>
          <p>Click on a ship to select, right click to rotate ship, click on an available tile to place ship</p>
          <ShipButtons placedShips={placedShips} selectedShip={selectedShip} setSelectedShip={setSelectedShip} />
        </div>
      </div>
      <button
        type="button"
        className={`
          ${stageStyles.startBattleButton}
          ${placedShips.length === 5 && stageStyles.isEnabled}
        `}
        onClick={() => handleStartBattle()}
        disabled={placedShips.length !== 5}
      >
        START BATTLE
      </button>
    </>
  );
}

export default ShipPlacementStage;
