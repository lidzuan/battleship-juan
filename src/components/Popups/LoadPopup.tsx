import { Cell, GameStage } from "../../types/types";
import { isValidGameID, loadGame } from "../../utils/api";
import Popup from "./Popup";
import popupStyles from "./Popup.module.css";

interface LoadPopupProps {
  setGameStage: (stage: GameStage) => void;
  setPlayerBoard: (board: Cell[][]) => void;
  setCpuBoard: (board: Cell[][]) => void;
  gameID: string;
  setGameID: (id: string) => void;
  setIsLoadPopupOpen: (isLoadPopupOpen: boolean) => void;
  loadErrorMessage: boolean;
  setLoadErrorMessage: (loadErrorMessage: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

function LoadPopup({
  setGameStage,
  setPlayerBoard,
  setCpuBoard,
  gameID,
  setGameID,
  setIsLoadPopupOpen,
  loadErrorMessage,
  setLoadErrorMessage,
  isLoading,
  setIsLoading,
}: LoadPopupProps) {
  const handleLoadClick = async () => {
    setIsLoading(true);
    const loadGameData = await loadGame(gameID);
    if (loadGameData) {
      setPlayerBoard(loadGameData.playerBoard);
      setCpuBoard(loadGameData.cpuBoard);
      setGameID("");
      setGameStage(GameStage.Battle);
    } else {
      setLoadErrorMessage(true);
    }
    setIsLoading(false);
  };

  return (
    <Popup>
      <p className={popupStyles.largeDesc}>Load your progress?</p>
      <input
        type="text"
        id="inputLoadGameID"
        placeholder="Enter a valid game ID"
        onFocus={() => setLoadErrorMessage(false)}
        onChange={(e) => setGameID(e.target.value)}
      />
      {!isValidGameID(gameID) && (
        <p className={popupStyles.invalidGameIDDesc}>
          Only alphanumeric characters (a-z, A-Z),
          <br />
          dashes (-), and underscores (_) are allowed.
        </p>
      )}
      {loadErrorMessage && (
        <p className={popupStyles.invalidGameIDDesc}>
          Failed to load game data.
          <br />
          Please check game ID and try again.
        </p>
      )}
      <button type="button" onClick={() => handleLoadClick()} disabled={!isValidGameID(gameID)}>
        {isLoading ? "LOADING" : "LOAD"}
      </button>
      <button
        type="button"
        onClick={() => {
          setGameID("");
          setIsLoadPopupOpen(false);
          setLoadErrorMessage(false);
        }}
      >
        CANCEL
      </button>
    </Popup>
  );
}

export default LoadPopup;
