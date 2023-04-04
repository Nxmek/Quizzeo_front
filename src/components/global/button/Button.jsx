import mc from "./buttons.module.scss";
const Buttons = ({ textBtn, onClick, disabled, nameClass }) => {
  return (
    <button
      onClick={onClick}
      className={`${mc.darkBtn} ${nameClass}`}
      disabled={disabled}
    >
      {textBtn}
    </button>
  );
};
export default Buttons;
