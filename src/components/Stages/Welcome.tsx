import { useState } from "react";
import imageURL from "../../assets/battleship-dark-slate-grey.png";
import { Cell, GameStage } from "../../types/types";
import LoadPopup from "../Popups/LoadPopup";
import stageStyles from "./Welcome.module.css";

interface WelcomeProps {
  setGameStage: (stage: GameStage) => void;
  setPlayerBoard: (board: Cell[][]) => void;
  setCpuBoard: (board: Cell[][]) => void;
  gameID: string;
  setGameID: (id: string) => void;
}

function Welcome({ setGameStage, setPlayerBoard, setCpuBoard, gameID, setGameID }: WelcomeProps) {
  const [isLoadPopupOpen, setIsLoadPopupOpen] = useState<boolean>(false);
  const [loadErrorMessage, setLoadErrorMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <h1 className={stageStyles.gameTitle}>BATTLESHIP</h1>
      <img className={stageStyles.battleshipImage} src={imageURL} alt="2D battleship side view" />
      <p className={stageStyles.welcomeText}>
        Ready to command your fleet?
        <br />
        Welcome to the timeless game of naval strategy.
      </p>
      <button type="button" className={stageStyles.newGameButton} onClick={() => setGameStage(GameStage.ShipPlacement)}>
        NEW GAME
      </button>
      <button type="button" className={stageStyles.loadGameButton} onClick={() => setIsLoadPopupOpen(true)}>
        LOAD GAME
      </button>
      <p>
        <i>Made by Juan</i>
      </p>

      {isLoadPopupOpen && (
        <LoadPopup
          setGameStage={setGameStage}
          setPlayerBoard={setPlayerBoard}
          setCpuBoard={setCpuBoard}
          gameID={gameID}
          setGameID={setGameID}
          setIsLoadPopupOpen={setIsLoadPopupOpen}
          loadErrorMessage={loadErrorMessage}
          setLoadErrorMessage={setLoadErrorMessage}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
}

export default Welcome;
