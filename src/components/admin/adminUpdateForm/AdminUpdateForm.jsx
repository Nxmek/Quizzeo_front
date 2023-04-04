import React, { useEffect, useState } from "react";
import mc from "./admin-form.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../global/button/Button";
import BackBtn from "../../global/back-btn/BackBtn";
import AdminInput from "../../global/adminInput/AdminInput";
import { updateThunk } from "../../../api/questions/update.api";

const AdminUpdateForm = ({ category, id }) => {
  const dispatch = useDispatch();
  const { question, responses, submitClick, error, form, questionId } =
    useSelector((store) => {
      return {
        ...store.questionReducer,
        error: store.errorReducer.error,
      };
    });

  const handleChangeField_txt = (key, value) => {
    dispatch({ type: "ADMIN_UPDATE_FIELD_TXT", payload: { key, value } });
  };

  const test = (key, value) => {
    dispatch({ type: "TEST", payload: { key, value } });
  };
  const getGoodResponse = () => {
    const goodResponseARR = Object.keys(responses).find(
      (key) => responses[key].good_one === true
    );
    return goodResponseARR;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const radios = [...elements].filter((r) => r.type === "radio");
    const r_checked = radios.find((r) => r.checked);
    console.log(r_checked);
    const r_checked_value = r_checked.value;
    dispatch({ type: "GOOD_ONE", payload: { key: r_checked_value } });
    dispatch({ type: "SUBMIT_CLICK" });
  };

  const [value, setValue] = useState(getGoodResponse());

  useEffect(() => {
    const form = {
      theQuestion: question,
      category,
      responses: [
        { value: responses.resp1.value, good_one: responses.resp1.good_one },
        { value: responses.resp2.value, good_one: responses.resp2.good_one },
        { value: responses.resp3.value, good_one: responses.resp3.good_one },
        { value: responses.resp4.value, good_one: responses.resp4.good_one },
      ],
    };
    // console.log(id);
    if (submitClick) {
      dispatch((dispatch, getState) =>
        updateThunk(dispatch, getState, form, questionId)
      );
      window.location.reload();
    }
  }, [submitClick]);
  useEffect(() => {
    getGoodResponse();
  }, []);

  useEffect(() => {
    console.log(form);
  }, [form]);
  return (
    <div className={` ${mc.container}`}>
      <div className={mc.up}>
        <BackBtn onClick={() => dispatch({ type: "RESET_STATE" })} />
        <h1>Modifier la question</h1>
      </div>
      <div className={mc.bottom}>
        {error && <p>{error}</p>}
        <form className={mc.formContainer} onSubmit={handleSubmit}>
          <h2>{category}</h2>
          <AdminInput
            nameClass={`inputBox`}
            type={"text"}
            spanName={"Question à modifier"}
            value={question}
            onChange={(e) => handleChangeField_txt("question", e.target.value)}
          />
          <div className={mc.responseContainer}>
            <AdminInput
              nameClass={"inputBox"}
              type={"text"}
              spanName={"Réponse 1"}
              value={responses.resp1.value}
              onChange={(e) => test("resp1", e.target.value)}
            />
            <div className={mc.radioContainer}>
              <input
                type="radio"
                name="GoodChoice"
                value={"resp1"}
                checked={value === "resp1" ? true : false}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                required
              />
              <label htmlFor="Response1">Bonne réponse</label>
            </div>
          </div>
          <div className={mc.responseContainer}>
            <AdminInput
              nameClass={"inputBox"}
              type={"text"}
              spanName={"Réponse 2"}
              value={responses?.resp2?.value}
              onChange={(e) => test("resp2", e.target.value)}
            />
            <div className={mc.radioContainer}>
              <input
                type="radio"
                name="GoodChoice"
                value={"resp2"}
                checked={value === "resp2" ? true : false}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <label htmlFor="Response2">Bonne réponse</label>
            </div>
          </div>
          <div className={mc.responseContainer}>
            <AdminInput
              nameClass={"inputBox"}
              type={"text"}
              spanName={"Réponse 3"}
              value={responses.resp3.value}
              onChange={(e) => test("resp3", e.target.value)}
            />
            <div className={mc.radioContainer}>
              <input
                type="radio"
                name="GoodChoice"
                value={"resp3"}
                checked={value === "resp3" ? true : false}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <label htmlFor="Response3">Bonne réponse</label>
            </div>
          </div>
          <div className={mc.responseContainer}>
            <AdminInput
              nameClass={"inputBox"}
              type={"text"}
              spanName={"Réponse 4"}
              value={responses.resp4.value}
              onChange={(e) => test("resp4", e.target.value)}
            />
            <div className={mc.radioContainer}>
              <input
                type="radio"
                name="GoodChoice"
                value={"resp4"}
                checked={value === "resp4" ? true : false}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <label htmlFor="Response4">Bonne réponse</label>
            </div>
          </div>
          <Button textBtn={"Modifier "} />
        </form>
      </div>
    </div>
  );
};

export default AdminUpdateForm;
