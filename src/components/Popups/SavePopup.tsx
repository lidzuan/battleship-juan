import { Cell } from "../../types/types";
import { isValidGameID, saveGame } from "../../utils/api";
import Popup from "./Popup";
import popupStyles from "./Popup.module.css";

interface SavePopupProps {
  playerBoard: Cell[][];
  cpuBoard: Cell[][];
  gameID: string;
  setGameID: (id: string) => void;
  setIsSavePopupOpen: (isSavePopupOpen: boolean) => void;
  saveErrorMessage: boolean;
  setSaveErrorMessage: (loadErrorMessage: boolean) => void;
  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;
}

function SavePopup({
  playerBoard,
  cpuBoard,
  gameID,
  setGameID,
  setIsSavePopupOpen,
  saveErrorMessage,
  setSaveErrorMessage,
  isSaving,
  setIsSaving,
}: SavePopupProps) {
  const handleSaveClick = async () => {
    setIsSaving(true);
    const saveGameData = await saveGame(gameID, playerBoard, cpuBoard);
    if (saveGameData) {
      setIsSavePopupOpen(false);
      setGameID("");
    } else {
      setSaveErrorMessage(true);
    }
    setIsSaving(false);
  };

  return (
    <Popup>
      <p className={popupStyles.largeDesc}>Save your progress?</p>
      <input
        type="text"
        id="inputSaveGameID"
        placeholder="Enter a valid game ID"
        onFocus={() => setSaveErrorMessage(false)}
        onChange={(e) => setGameID(e.target.value)}
      />
      {!isValidGameID(gameID) && (
        <p className={popupStyles.invalidGameIDDesc}>
          Only alphanumeric characters (a-z, A-Z),
          <br />
          dashes (-), and underscores (_) are allowed.
        </p>
      )}
      {saveErrorMessage && (
        <p className={popupStyles.invalidGameIDDesc}>
          Failed to save game data.
          <br />
          Please check game ID and try again.
        </p>
      )}
      <button type="button" onClick={() => handleSaveClick()} disabled={!isValidGameID(gameID)}>
        {isSaving ? "SAVING" : "SAVE"}
      </button>
      <button
        type="button"
        onClick={() => {
          setGameID("");
          setIsSavePopupOpen(false);
          setSaveErrorMessage(false);
        }}
      >
        CANCEL
      </button>
    </Popup>
  );
}

export default SavePopup;
