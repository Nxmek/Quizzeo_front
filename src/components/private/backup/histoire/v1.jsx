import React, { useEffect } from "react";
import mc from "./histoire.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { readHistoryThunk } from "../../../api/questions/read-questions-by-cat.api.js";
import { handleResult, test } from "../../../utils/question.utils.js";
import { useState } from "react";
import Buttons from "../../global/button/Button";

const Histoire = () => {
  const dispatch = useDispatch();

  const { questions } = useSelector((store) => {
    return {
      ...store.questionReducer,
      ...store.userReducer,
      loading: store.loadingReducer.loading,
    };
  });
  const questionNumber = useSelector((store) => {
    return store.questionUtilsReducer.questionNumber;
  });
  const clickIsDisabled = useSelector((store) => {
    return store.questionUtilsReducer.clickIsDisabled;
  });
  const arrQuestion = questions[questionNumber];
  const responses = arrQuestion?.responses;

  const handleResponses = () => {
    setShowResult(true);
  };

  const nextQuestion = () => {
    setShowResult(false);
    dispatch({ type: "DISABLE_CLICK" });
    dispatch({ type: "INCREMENT_NUMBER_OF_QUESTION" });
  };
  const handleScore = (res) => {
    dispatch({ type: "DISABLE_CLICK" });
    if (!res.good_one) return;
    dispatch({ type: "INCREMENT_SCORE" });
  };
  const [showResult, setShowResult] = useState(false);
  useEffect(() => {
    dispatch(readHistoryThunk);
  }, []);

  return (
    <>
      <div className={mc.container}>
        <div className={mc.questionNumber}>
          <p>{`Question ${questionNumber + 1}/10`}</p>
        </div>

        <h1 className={mc.question}>{test(questions, questionNumber) || ""}</h1>
        <div className={mc.responses_contain}>
          <ul className={mc.responses}>
            {responses?.map((res, i) => {
              return (
                <li
                  onClick={() => {
                    if (!clickIsDisabled) {
                      handleResponses();
                      handleScore(res);
                    } else {
                      return;
                    }
                  }}
                  key={i}
                  className={handleResult(
                    showResult,
                    res,
                    mc.goodResponse,
                    mc.badResponse
                  )}
                >
                  <p>{res.value}</p>
                </li>
              );
            }) || ""}
          </ul>
        </div>
        {showResult ? (
          <div className={mc.next_container}>
            <Buttons
              textBtn={"Question Suivante"}
              onClick={() => {
                nextQuestion();
              }}
              nameClass={mc.next}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Histoire;

// className={`${
//   showResult
//     ? res.good_one
//       ? mc.goodResponse
//       : mc.badResponse
//     : ""
// }`}
