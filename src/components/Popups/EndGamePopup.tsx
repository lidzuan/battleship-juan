import { Winner } from "../../types/types";
import Popup from "./Popup";
import popupStyles from "./Popup.module.css";

interface EndGamePopupProps {
  isWinner: Winner | null;
  setIsEndGamePopupOpen: (isEndGamePopupOpen: boolean) => void;
}

function EndGamePopup({ isWinner, setIsEndGamePopupOpen }: EndGamePopupProps) {
  return (
    <Popup
      additionalClassName={`
            ${isWinner === "Player" && popupStyles.playerWins}
            ${isWinner === "CPU" && popupStyles.cpuWins}
          `}
    >
      <p className={`${popupStyles.largeDesc} ${popupStyles.winDesc}`}>
        {isWinner === "Player" ? "YOU WON!" : "CPU WON!"}
      </p>
      <button type="button" className={popupStyles.closeButton} onClick={() => setIsEndGamePopupOpen(false)}>
        CLOSE
      </button>
    </Popup>
  );
}

export default EndGamePopup;
