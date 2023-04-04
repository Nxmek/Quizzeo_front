import mc from "./question-btn.module.scss";

const QuestionBtn = ({ textBtn, onClick, disabled, nameClass }) => {
  return (
    <button
      onClick={onClick}
      className={`${mc.questionBtn} mc.${nameClass}`}
      disabled={disabled}
    >
      {textBtn}
    </button>
  );
};
export default QuestionBtn;
