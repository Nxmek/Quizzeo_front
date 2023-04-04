import React, { useEffect } from "react";
import mc from "./questions.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { showQuestion } from "../../../utils/question.utils.js";
import QuestionBtn from "../../global/question-btn/QuestionBtn";
import EndQuiz from "../../global/end-quiz/EndQuiz";
import BackBtn from "../../global/back-btn/BackBtn";
import { Link } from "react-router-dom";

const Questions = ({ thunk }) => {
  const dispatch = useDispatch();

  const {
    sortedQuestions,
    questionNumber,
    activeID,
    showValidateBtn,
    clickIsDisabled,
    showResult,
    url,
    startTimer,
  } = useSelector((store) => {
    return {
      ...store.questionUtilsReducer,
      startTimer: store.countdownReducer.startTimer,
      sortedQuestions: store.questionReducer.sortedQuestions,
    };
  });
  const arrQuestion = sortedQuestions[questionNumber];
  const responses = arrQuestion?.responses;

  //Je clique sur une réponse et le bouton valider apparaît
  const selectResponse = (id) => {
    dispatch({ type: "SELECT", payload: id });
    dispatch({ type: "SHOW_VALIDATE" });
  };

  //retourne le bouton Valider
  const validateBtn = () => {
    return (
      <QuestionBtn
        textBtn={"Valider"}
        onClick={() => {
          checkResult();
        }}
        // nameClass={"tes"}
      />
    );
  };

  //retourne le bouton Question suivante
  const NextBtn = () => (
    <QuestionBtn
      textBtn={"question suivante"}
      onClick={() => goToNextQuestion()}
    />
  );

  const goToNextQuestion = () => {
    dispatch({ type: "INCREMENT_NUMBER_OF_QUESTION" });
    dispatch({ type: "HIDE_RESULT" });
    dispatch({ type: "SELECT_RESET" });
    dispatch({ type: "DISABLE_CLICK" });
  };

  // retourne un espace vide
  const emptySpace = () => {
    return <div className={mc.empty}></div>;
  };

  //pour verifier le result
  const checkResult = () => {
    dispatch({ type: "HIDE_VALIDATE" });
    dispatch({ type: "DISABLE_CLICK" });

    const selected = responses.find((response) => {
      return response._id === activeID;
    });
    dispatch({ type: "SHOW_RESULT", payload: { response: selected } });
  };

  //condition pour afficher la bonne ou mauvaise réponse en fonction de la classe
  const conditionClassName = (res) => {
    if (!showResult && activeID === res._id) {
      return mc.selected;
    } else if (showResult) {
      if (res.good_one) {
        return mc.good_one;
      }
      if (res._id === activeID && !res.good_one) {
        return mc.wrong_one;
      }
    }
  };

  // condition pour afficher le bouton valider ou prochaine question
  const conditionRongeuseDeCrane = () => {
    if (activeID !== null && showValidateBtn === true) {
      return validateBtn();
    }
    if (activeID !== null && showValidateBtn === false) {
      return NextBtn();
    }
    if (activeID === null) {
      return emptySpace();
    }
  };

  const startGame = () => {
    if (startTimer === false) {
      return (
        <div className={mc.start_page}>
          <h1>{`Quizz ${url}`}</h1>
          <QuestionBtn
            textBtn={"Commencer"}
            onClick={() => {
              dispatch({ type: "SHOW_DETAILS" });
              dispatch({ type: "START" });
              dispatch({ type: "TIMER" });
              dispatch({ type: "RESET_NUMBER_OF_QUESTION" });
              dispatch({ type: "RESET_SCORE" });
            }}
          />
        </div>
      );
    } else {
      return (
        <>
          {questionNumber <= 9 ? (
            <div className={mc.questionNumber}>
              <p>{`Question ${questionNumber + 1}/10`}</p>
            </div>
          ) : (
            ""
          )}
          <h1 className={mc.question}>
            {showQuestion(sortedQuestions, questionNumber) || ""}
          </h1>
          <div className={mc.responses_contain}>
            <ul className={mc.responses}>
              {responses?.map((res) => {
                return (
                  <li
                    key={res._id}
                    onClick={() => {
                      if (!clickIsDisabled) {
                        selectResponse(res._id);
                      } else {
                        return;
                      }
                    }}
                    className={conditionClassName(res)}
                  >
                    <p>{res.value}</p>
                  </li>
                );
              }) || ""}
              {conditionRongeuseDeCrane()}
            </ul>
          </div>
          {questionNumber >= 10 ? <EndQuiz /> : ""}
        </>
      );
    }
  };
  /*--------------- Use Effect------------------*/
  useEffect(() => {
    dispatch(thunk);
  }, []);
  useEffect(() => {
    const path = window.location.pathname;
    const url = path.substring(path.lastIndexOf("/") + 1);
    dispatch({ type: "READ_URL", url });
  }, [window.location.pathname]);

  // useEffect(() => {
  //   console.log(userId);
  // }, [userId]);
  /*--------------- Afficher la vue------------------*/

  return (
    <>
      <div className={`box ${mc.container}`}>
        <Link
          to={"/"}
          onClick={() => {
            dispatch({ type: "STOP" });
          }}
        >
          <div className={mc.backBtn}>
            <BackBtn />
          </div>
        </Link>
        {startGame()}
      </div>
    </>
  );
};

export default Questions;
