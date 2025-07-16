import { ships } from "../../constants/constants";
import { Ship } from "../../types/types";
import shipButtonStyles from "./ShipButtons.module.css";

interface ShipsProps {
  placedShips: Ship[];
  selectedShip: Ship | null;
  setSelectedShip: (ship: Ship | null) => void;
}

function Ships({ placedShips, selectedShip, setSelectedShip }: ShipsProps) {
  const placedShipsId = placedShips.map((ship) => ship.id);

  return (
    <div className={shipButtonStyles.shipButtonContainer}>
      {ships.map((ship) => {
        const isPlaced = placedShipsId.includes(ship.id);

        return (
          <button
            type="button"
            key={ship.id}
            className={`
              ${shipButtonStyles.shipButton}
              ${selectedShip && selectedShip.id === ship.id && shipButtonStyles.isSelected}
              ${isPlaced && shipButtonStyles.isPlaced}
            `}
            onClick={() => setSelectedShip(ship)}
            disabled={isPlaced}
          >
            {ship.name} ({ship.length})
          </button>
        );
      })}
    </div>
  );
}

export default Ships;
