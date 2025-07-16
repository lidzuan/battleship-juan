import { useState } from "react";
import { Cell, HoveredCell, Ship, Winner } from "../../types/types";
import boardStyles from "./Board.module.css";
import RenderCell from "./RenderCell";

interface PlayerBoardProps {
  playerBoard: Cell[][];
  selectedShip?: Ship | null;
  playerCellClick?: (rowIndex: number, colIndex: number, isHorizontal: boolean) => void;
  isWinner?: Winner | null;
}

function PlayerBoard({ playerBoard, selectedShip, playerCellClick, isWinner }: PlayerBoardProps) {
  const [hoveredCell, setHoveredCell] = useState<HoveredCell | null>(null);
  const [isHorizontal, setIsHorizontal] = useState<boolean>(true);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (playerCellClick) playerCellClick(rowIndex, colIndex, isHorizontal);
  };

  return (
    <div
      className={`${boardStyles.board} ${boardStyles.playerBoard}`}
      onContextMenu={() => {
        if (selectedShip) setIsHorizontal(!isHorizontal);
      }}
    >
      {playerBoard.map((row, rowIndex) => (
        <div key={row.map((cell) => cell.id).join("-")} className={boardStyles.row}>
          {row.map((cell, colIndex) => (
            <RenderCell
              key={cell.id}
              cell={cell}
              rowIndex={rowIndex}
              colIndex={colIndex}
              board={playerBoard}
              isPlayerBoard
              handleCellClick={handleCellClick}
              selectedShip={selectedShip}
              hoveredCell={hoveredCell}
              setHoveredCell={setHoveredCell}
              isHorizontal={isHorizontal}
              isWinner={isWinner}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default PlayerBoard;
