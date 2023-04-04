import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EndQuiz from "../end-quiz/EndQuiz";
import mc from "./countdown.module.scss";
const CountDown = () => {
  const dispatch = useDispatch();
  const { time, showEndQuiz, initTime } = useSelector((store) => {
    return {
      ...store.countdownReducer,
    };
  });
  const timeInPourcent = (time * 100) / initTime;

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")} : ${seconds
    .toString()
    .padStart(2, "0")}`;

  useEffect(() => {
    if (time <= 0) {
      dispatch({ type: "SHOW_END_QUIZ" });
    }
    const timer = setTimeout(() => {
      dispatch({ type: "TIMER" });
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  return (
    <>
      {showEndQuiz && <EndQuiz />}
      <div className={mc.contain}>
        <p className={mc.countdown}>{formattedTime}</p>
        <div className={mc.fullBar}>
          <div
            style={{ width: `${timeInPourcent}%` }}
            className={mc.timeLeft}
          ></div>
        </div>
      </div>
    </>
  );
};

export default CountDown;
