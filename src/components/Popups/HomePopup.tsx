import { Cell, GameStage, Winner } from "../../types/types";
import { initialBoard } from "../../utils/board-utils";
import Popup from "./Popup";
import popupStyles from "./Popup.module.css";

interface HomePopupProps {
  setGameStage: (stage: GameStage) => void;
  setPlayerBoard: (board: Cell[][]) => void;
  setCpuBoard: (board: Cell[][]) => void;
  isWinner: Winner | null;
  setIsHomePopupOpen: (isHomePopupOpen: boolean) => void;
}

function HomePopup({ setGameStage, setPlayerBoard, setCpuBoard, isWinner, setIsHomePopupOpen }: HomePopupProps) {
  const handleHomeClick = () => {
    setPlayerBoard(initialBoard());
    setCpuBoard(initialBoard());
    setGameStage(GameStage.Welcome);
  };

  return (
    <Popup>
      <p>
        <span className={popupStyles.largeDesc}>Return to home?</span>
        {!isWinner && (
          <>
            <br />
            <span>Unsaved game progress will be lost.</span>
          </>
        )}
      </p>
      <button type="button" onClick={() => handleHomeClick()}>
        YES
      </button>
      <button type="button" onClick={() => setIsHomePopupOpen(false)}>
        NO
      </button>
    </Popup>
  );
}

export default HomePopup;
