import { Cell, Winner } from "../../types/types";
import boardStyles from "./Board.module.css";
import RenderCell from "./RenderCell";

interface CPUBoardProps {
  cpuBoard: Cell[][];
  handlePlayerMove: (rowIndex: number, colIndex: number) => void;
  isWinner: Winner | null;
}

function CPUBoard({ cpuBoard, handlePlayerMove, isWinner }: CPUBoardProps) {
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!cpuBoard[rowIndex][colIndex].status) handlePlayerMove(rowIndex, colIndex);
  };

  return (
    <div className={`${boardStyles.board} ${boardStyles.cpuBoard}`}>
      {cpuBoard.map((row, rowIndex) => (
        <div
          key={row.map((cell) => cell.id).join("-")}
          className={`${boardStyles.row} ${isWinner && boardStyles.endGameBoard}`}
        >
          {row.map((cell, colIndex) => (
            <RenderCell
              key={cell.id}
              cell={cell}
              rowIndex={rowIndex}
              colIndex={colIndex}
              board={cpuBoard}
              isPlayerBoard={false}
              handleCellClick={handleCellClick}
              isWinner={isWinner}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default CPUBoard;
