import { useEffect, useState } from "react";
import { Cell, GameStage, Winner } from "../../types/types";
import { cpuMove, isGameOver, playerMove } from "../../utils/board-utils";
import CPUBoard from "../Board/CPUBoard";
import PlayerBoard from "../Board/PlayerBoard";
import EndGamePopup from "../Popups/EndGamePopup";
import HomePopup from "../Popups/HomePopup";
import SavePopup from "../Popups/SavePopup";
import stageStyles from "./BattleStage.module.css";

interface BattleStageProps {
  setGameStage: (stage: GameStage) => void;
  playerBoard: Cell[][];
  setPlayerBoard: (board: Cell[][]) => void;
  cpuBoard: Cell[][];
  setCpuBoard: (board: Cell[][]) => void;
  gameID: string;
  setGameID: (id: string) => void;
}

function BattleStage({
  setGameStage,
  playerBoard,
  setPlayerBoard,
  cpuBoard,
  setCpuBoard,
  gameID,
  setGameID,
}: BattleStageProps) {
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [isWinner, setIsWinner] = useState<Winner | null>(null);
  const [isEndGamePopupOpen, setIsEndGamePopupOpen] = useState<boolean>(false);
  const [isHomePopupOpen, setIsHomePopupOpen] = useState<boolean>(false);
  const [isSavePopupOpen, setIsSavePopupOpen] = useState<boolean>(false);
  const [saveErrorMessage, setSaveErrorMessage] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handlePlayerMove = (rowIndex: number, colIndex: number) => {
    if (isPlayerTurn && !isWinner) {
      setCpuBoard(playerMove(cpuBoard, rowIndex, colIndex));
      if (isGameOver(cpuBoard)) {
        setIsWinner("Player");
        setIsEndGamePopupOpen(true);
      } else {
        setIsPlayerTurn(!isPlayerTurn);
      }
    }
  };

  useEffect(() => {
    if (!isPlayerTurn && !isWinner) {
      const timer = setTimeout(() => {
        setPlayerBoard(cpuMove(playerBoard));
        if (isGameOver(playerBoard)) {
          setIsWinner("CPU");
          setIsEndGamePopupOpen(true);
        } else {
          setIsPlayerTurn(!isPlayerTurn);
        }
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, isWinner, playerBoard, setPlayerBoard]);

  return (
    <>
      <div className={stageStyles.buttonsContainer}>
        <button
          type="button"
          className={stageStyles.saveButton}
          onClick={() => setIsSavePopupOpen(true)}
          disabled={isWinner !== null}
        >
          SAVE
        </button>
        <button type="button" className={stageStyles.homeButton} onClick={() => setIsHomePopupOpen(true)}>
          HOME
        </button>
      </div>

      <div className={stageStyles.boards}>
        <div className={`${stageStyles.boardContainer} ${!isPlayerTurn && stageStyles.cpuTurn}`}>
          <p>Your Board</p>
          <PlayerBoard playerBoard={playerBoard} isWinner={isWinner} />
        </div>
        <div className={`${stageStyles.boardContainer} ${isPlayerTurn && stageStyles.playerTurn}`}>
          <p>CPU&apos;s Board</p>
          <CPUBoard cpuBoard={cpuBoard} handlePlayerMove={handlePlayerMove} isWinner={isWinner} />
        </div>
      </div>

      <div
        className={`${stageStyles.gameStatusDescription} ${isPlayerTurn ? stageStyles.playerTurn : stageStyles.cpuTurn}`}
      >
        {isWinner !== null ? (
          <p>
            [ GAME OVER ]<br />
            {isWinner === "Player"
              ? "You destroyed CPU's fleet, congrats! 🍾🍻"
              : '🤖: "Better luck next time, hooman."'}
          </p>
        ) : isPlayerTurn ? (
          <p>
            It&apos;s your turn!
            <br />
            Click on any available tile on the CPU&apos;s board to FIRE.
          </p>
        ) : (
          <p>🤖 CPU is thinking... 🤖</p>
        )}
      </div>

      {isEndGamePopupOpen && <EndGamePopup isWinner={isWinner} setIsEndGamePopupOpen={setIsEndGamePopupOpen} />}

      {isHomePopupOpen && (
        <HomePopup
          setGameStage={setGameStage}
          setPlayerBoard={setPlayerBoard}
          setCpuBoard={setCpuBoard}
          isWinner={isWinner}
          setIsHomePopupOpen={setIsHomePopupOpen}
        />
      )}

      {isSavePopupOpen && (
        <SavePopup
          playerBoard={playerBoard}
          cpuBoard={cpuBoard}
          gameID={gameID}
          setGameID={setGameID}
          setIsSavePopupOpen={setIsSavePopupOpen}
          saveErrorMessage={saveErrorMessage}
          setSaveErrorMessage={setSaveErrorMessage}
          isSaving={isSaving}
          setIsSaving={setIsSaving}
        />
      )}
    </>
  );
}

export default BattleStage;
