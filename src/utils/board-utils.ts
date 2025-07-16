import { boardSize, ships } from "../constants/constants";
import { Cell, Ship } from "../types/types";

export function initialBoard(): Cell[][] {
  const board: Cell[][] = [];
  for (let row = 0; row < boardSize; row += 1) {
    const rowCells: Cell[] = [];
    for (let col = 0; col < boardSize; col += 1) {
      rowCells.push({ id: `${row}${col}`, value: 0 });
    }
    board.push(rowCells);
  }
  return board;
}

export function isValidPlacement(
  board: Cell[][],
  ship: Ship,
  rowIndex: number,
  colIndex: number,
  isHorizontal: boolean
): boolean {
  const { length } = ship;

  for (let i = 0; i < length; i += 1) {
    const targetRowIndex = isHorizontal ? rowIndex : rowIndex + i;
    const targetColIndex = isHorizontal ? colIndex + i : colIndex;

    if (targetRowIndex >= boardSize || targetColIndex >= boardSize) return false;
    if (board[targetRowIndex][targetColIndex].value !== 0) return false;
  }

  return true;
}

export function placeShip(
  board: Cell[][],
  ship: Ship,
  rowIndex: number,
  colIndex: number,
  isHorizontal: boolean
): Cell[][] {
  const tempBoard = [...board];

  for (let i = 0; i < ship.length; i += 1) {
    const placeRowIndex = isHorizontal ? rowIndex : rowIndex + i;
    const placeColIndex = isHorizontal ? colIndex + i : colIndex;

    tempBoard[placeRowIndex][placeColIndex].value = ship.id;
  }

  return tempBoard;
}

function placeRandomShip(board: Cell[][], ship: Ship): Cell[][] {
  const rowIndex = Math.floor(Math.random() * boardSize);
  const colIndex = Math.floor(Math.random() * boardSize);
  const isHorizontal = Math.random() < 0.5;

  if (isValidPlacement(board, ship, rowIndex, colIndex, isHorizontal))
    return placeShip(board, ship, rowIndex, colIndex, isHorizontal);

  return placeRandomShip(board, ship);
}

export function renderCPUBoard(cpuBoard: Cell[][]): Cell[][] {
  return ships.reduce((board, ship) => placeRandomShip(board, ship), cpuBoard);
}

function isShipDestroyed(newBoard: Cell[][], shipId: number) {
  for (let row = 0; row < boardSize; row += 1) {
    for (let col = 0; col < boardSize; col += 1) {
      if (newBoard[row][col].value === shipId && newBoard[row][col].status !== "hit") return false;
    }
  }

  return true;
}

export function playerMove(board: Cell[][], rowIndex: number, colIndex: number): Cell[][] {
  if (!board[rowIndex][colIndex].status) {
    const newBoard = [...board];
    const cell = newBoard[rowIndex][colIndex];

    if (cell.value !== 0) {
      cell.status = "hit";

      if (isShipDestroyed(newBoard, cell.value)) {
        for (let row = 0; row < boardSize; row += 1) {
          for (let col = 0; col < boardSize; col += 1) {
            if (newBoard[row][col].value === cell.value) newBoard[row][col].status = "destroyed";
          }
        }
      }
    } else {
      cell.status = "miss";
    }

    return newBoard;
  }

  return board;
}

export function cpuMove(board: Cell[][]): Cell[][] {
  const availableCells = [];
  for (let row = 0; row < boardSize; row += 1) {
    for (let col = 0; col < boardSize; col += 1) {
      if (!board[row][col].status) availableCells.push({ row, col });
    }
  }

  const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
  return playerMove(board, randomCell.row, randomCell.col);
}

export function isGameOver(board: Cell[][]): boolean {
  return board.every((row) => row.every((cell) => cell.value === 0 || cell.status === "destroyed"));
}
