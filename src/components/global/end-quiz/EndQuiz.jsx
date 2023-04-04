import React from "react";
import { useDispatch, useSelector } from "react-redux";
import mc from "./end-quiz.module.scss";
import QuestionBtn from "../question-btn/QuestionBtn";
import { useNavigate } from "react-router-dom";

const EndQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { score } = useSelector((store) => {
    return {
      ...store.questionUtilsReducer,
    };
  });

  const handleClick = () => {
    navigate("/");
    dispatch({ type: "RESET_SCORE" });
    dispatch({ type: "RESET_NUMBER_OF_QUESTION" });
    dispatch({ type: "RESET_TIMER" });
  };

  const dependOfScore = () => {
    if (score >= 16) {
      return (
        <div className={mc.big_container_16}>
          <div class={mc.firework}></div>
          <div class={mc.firework}></div>
          <div class={mc.firework}></div>
          <div className={mc.container}>
            <div className={mc.text}>
              <h1>{`Bravo,  tu as ${score}/20 !`}</h1>
              <p>Ça mérite bien un petit feu d'artifice!</p>
            </div>
            <button className={mc.btn} onClick={handleClick}>
              Retour
            </button>
          </div>
        </div>
      );
    } else if (score < 16) {
      return (
        <div className={mc.big_container}>
          <div className={mc.container}>
            <h1>{`Ton score est de ${score}/20`}</h1>
            <QuestionBtn textBtn={"Retour"} onClick={handleClick} />
          </div>
        </div>
      );
    }
  };

  return dependOfScore();
};
export default EndQuiz;
