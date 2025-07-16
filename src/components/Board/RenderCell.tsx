import { boardSize } from "../../constants/constants";
import { Ship, Cell, HoveredCell, Winner } from "../../types/types";
import boardStyles from "./Board.module.css";

interface RenderCellProps {
  cell: Cell;
  rowIndex: number;
  colIndex: number;
  board: Cell[][];
  isPlayerBoard: boolean;
  handleCellClick: (rowIndex: number, colIndex: number) => void;
  selectedShip?: Ship | null;
  hoveredCell?: HoveredCell | null;
  setHoveredCell?: (cell: HoveredCell | null) => void;
  isHorizontal?: boolean;
  isWinner?: Winner | null;
}

function RenderCell({
  cell,
  rowIndex,
  colIndex,
  board,
  isPlayerBoard,
  handleCellClick,
  selectedShip,
  hoveredCell,
  setHoveredCell,
  isHorizontal,
  isWinner,
}: RenderCellProps) {
  let isPreviewed = false;
  let isOutOfBounds = false;
  let isOverlapping = false;

  if (selectedShip && hoveredCell) {
    const { length } = selectedShip;
    const { hoveredRowIndex, hoveredColIndex } = hoveredCell;

    const isSameRowOrCol = isHorizontal ? rowIndex === hoveredRowIndex : colIndex === hoveredColIndex;
    const previewIndex = isHorizontal ? colIndex : rowIndex;
    const hoveredStartIndex = isHorizontal ? hoveredColIndex : hoveredRowIndex;
    const hoveredEndIndex = hoveredStartIndex + length;

    isPreviewed = isSameRowOrCol && previewIndex >= hoveredStartIndex && previewIndex < hoveredEndIndex;

    isOutOfBounds = isPreviewed && hoveredEndIndex > boardSize;

    isOverlapping =
      isPreviewed &&
      !isOutOfBounds &&
      board[isHorizontal ? hoveredRowIndex : rowIndex][isHorizontal ? colIndex : hoveredColIndex].value !== 0;
  }

  return (
    <button
      type="button"
      className={`
        ${boardStyles.cell}
        ${isPlayerBoard ? boardStyles.playerBoard : boardStyles.cpuBoard}
        ${isPlayerBoard && cell.value !== 0 && boardStyles.isPlaced}
        ${isPreviewed && boardStyles.isPreviewed}
        ${(isOutOfBounds || isOverlapping) && boardStyles.isInvalid}
        ${!isPlayerBoard && !isWinner && !cell.status && boardStyles.isEmpty}
        ${cell.status && boardStyles.isClicked}
        ${cell.status === "hit" && boardStyles.isHit}
        ${cell.status === "miss" && boardStyles.isMiss}
        ${cell.status === "destroyed" && boardStyles.isDestroyed}
        ${!isPlayerBoard && isWinner === "CPU" && !cell.status && cell.value !== 0 && boardStyles.unhitShips}
        ${isWinner && boardStyles.endGame}
      `}
      onMouseEnter={() => {
        if (setHoveredCell) setHoveredCell({ hoveredRowIndex: rowIndex, hoveredColIndex: colIndex });
      }}
      onClick={() => {
        handleCellClick(rowIndex, colIndex);
      }}
      onMouseLeave={() => {
        if (setHoveredCell) setHoveredCell(null);
      }}
      aria-label={`row-${rowIndex} col-${colIndex}`}
    />
  );
}

export default RenderCell;
