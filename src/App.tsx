import { useState } from "react";
import "./App.css";
import BattleStage from "./components/Stages/BattleStage";
import ShipPlacementStage from "./components/Stages/ShipPlacementStage";
import WelcomeScreen from "./components/Stages/Welcome";
import { GameStage, Cell } from "./types/types";
import { initialBoard } from "./utils/board-utils";

function App() {
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.Welcome);
  const [playerBoard, setPlayerBoard] = useState<Cell[][]>(initialBoard);
  const [cpuBoard, setCpuBoard] = useState<Cell[][]>(initialBoard);
  const [gameID, setGameID] = useState<string>("");

  return (
    <div
      className="game"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {gameStage === GameStage.Welcome && (
        <WelcomeScreen
          setGameStage={setGameStage}
          setPlayerBoard={setPlayerBoard}
          setCpuBoard={setCpuBoard}
          gameID={gameID}
          setGameID={setGameID}
        />
      )}
      {gameStage === GameStage.ShipPlacement && (
        <ShipPlacementStage
          setGameStage={setGameStage}
          playerBoard={playerBoard}
          setPlayerBoard={setPlayerBoard}
          cpuBoard={cpuBoard}
          setCpuBoard={setCpuBoard}
        />
      )}
      {gameStage === GameStage.Battle && (
        <BattleStage
          setGameStage={setGameStage}
          playerBoard={playerBoard}
          setPlayerBoard={setPlayerBoard}
          cpuBoard={cpuBoard}
          setCpuBoard={setCpuBoard}
          gameID={gameID}
          setGameID={setGameID}
        />
      )}
    </div>
  );
}

export default App;
