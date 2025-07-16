export enum GameStage {
  Welcome,
  ShipPlacement,
  Battle,
}

export interface Ship {
  id: number;
  name: string;
  length: number;
}

export interface Cell {
  id: string;
  value: number;
  status?: "hit" | "miss" | "destroyed";
}

export type HoveredCell = {
  hoveredRowIndex: number;
  hoveredColIndex: number;
};

export type Winner = "Player" | "CPU";
