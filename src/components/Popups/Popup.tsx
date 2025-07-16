import popupStyles from "./Popup.module.css";

interface PopupContainerProps {
  children: React.ReactNode;
  additionalClassName?: string;
}

function PopupContainer({ children, additionalClassName }: PopupContainerProps) {
  return (
    <div className={popupStyles.overlay}>
      <div className={`${popupStyles.modal} ${additionalClassName && additionalClassName}`}>{children}</div>
    </div>
  );
}

export default PopupContainer;
