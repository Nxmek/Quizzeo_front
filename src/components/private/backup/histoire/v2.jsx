import React, { useEffect } from "react";
import mc from "./histoire.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { readHistoryThunk } from "../../../api/questions/read-questions-by-cat.api.js";
import { test } from "../../../utils/question.utils.js";
import QuestionBtn from "../../global/question-btn/QuestionBtn";

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
  const activeID = useSelector((store) => {
    return store.questionUtilsReducer.activeID;
  });
  const showValidate = useSelector((store) => {
    return store.questionUtilsReducer.showValidateBtn;
  });

  const goodResponse = useSelector((store) => {
    return store.questionUtilsReducer.goodResponse;
  });
  const clickIsDisabled = useSelector((store) => {
    return store.questionUtilsReducer.clickIsDisabled;
  });

  const arrQuestion = questions[questionNumber];
  const responses = arrQuestion?.responses;

  //Je clique sur une reponse et le bouton valider apparait
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
        nameClass={"test"}
      />
    );
  };

  //retourne le bouton Question suivante
  const NextBtn = () => (
    <QuestionBtn
      textBtn={"question suivante"}
      onClick={() => {}}
      nameClass={"test"}
    />
  );

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
    if (selected.good_one === true) {
      dispatch({ type: "SHOW_GOOD" });
    }
    if (selected.good_one === false) {
      dispatch({ type: "SHOW_WRONG" });
    }
  };

  //condition pour afficher la bonne ou mauvaise réponse en fonction de la classe
  const conditionClassName = (res) => {
    //on ne cherche pas encore la réponse
    if (activeID === res._id && goodResponse === 0) {
      return mc.selected;
    }
    //la réponse est bonne
    else if (activeID === res._id && goodResponse === 1) {
      return mc.good_one;
    }
    //la réponse est mauvaise
    else if (activeID === res._id && goodResponse === 2) {
      return mc.wrong_one;
    }
  };

  // condition pour afficher le bouton valider ou prochaine question
  const conditionRongeuseDeCrane = () => {
    if (activeID !== null && showValidate === true) {
      return validateBtn();
    }
    if (activeID !== null && showValidate === false) {
      return NextBtn();
    }
    if (activeID === null) {
      return emptySpace();
    }
  };

  /*--------------- Use Effect------------------*/
  useEffect(() => {
    dispatch(readHistoryThunk);
  }, []);
  // useEffect(() => {
  //   console.log(showValidate);
  // }, [showValidate]);
  // useEffect(() => {
  //   console.log(activeID);
  // }, [activeID]);
  // useEffect(() => {
  //   console.log(clickIsDisabled);
  // }, [clickIsDisabled]);
  /*--------------- Afficher la vue------------------*/

  return (
    <>
      <div className={mc.container}>
        <div className={mc.questionNumber}>
          <p>{`Question ${questionNumber + 1}/10`}</p>
        </div>

        <h1 className={mc.question}>{test(questions, questionNumber) || ""}</h1>
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
                  className={conditionClassName(res)} //si active id === res_id et que goodResponse === 0
                >
                  <p>{res.value}</p>
                </li>
              );
            }) || ""}
            {conditionRongeuseDeCrane()}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Histoire;
