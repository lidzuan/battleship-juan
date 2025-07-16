import { Cell } from "../types/types";

// Note: Backend API URL intentionally removed. Save/load functionality will be disabled.
const url = "*OMITTED DUE TO SECURITY REASONS*";

export function isValidGameID(gameID: string): boolean {
  const validPattern: RegExp = /^[a-zA-Z0-9_-]+$/;
  return validPattern.test(gameID);
}

export async function saveGame(gameID: string, playerBoard: Cell[][], cpuBoard: Cell[][]): Promise<boolean> {
  const requestBody = {
    id: `battleship-juan/${gameID}`,
    data: JSON.stringify({
      playerBoard,
      cpuBoard,
    }),
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error();
    }

    return true;
  } catch (error) {
    return false;
  }
}

export async function loadGame(gameID: string): Promise<{ playerBoard: Cell[][]; cpuBoard: Cell[][] } | null> {
  try {
    const response = await fetch(`${url}?id=battleship-juan/${gameID}`);

    if (!response.ok) {
      throw new Error();
    }

    const gameData = await response.json();

    const parsedGameData: { playerBoard: Cell[][]; cpuBoard: Cell[][] } = JSON.parse(gameData.data);

    return parsedGameData;
  } catch (error) {
    return null;
  }
}
