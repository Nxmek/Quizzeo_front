import React, { useEffect } from "react";
import mc from "./admin-form.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../global/button/Button";
import BackBtn from "../../global/back-btn/BackBtn";
import AdminInput from "../../global/adminInput/AdminInput";
import { createThunk } from "../../../api/questions/create.apI";
// import { readCatThunkAdmin } from "../../../../api/questions/read-questions-by-cat.api";

const AdminForm = ({ category }) => {
  const dispatch = useDispatch();
  const { question, responses, submitClick, error } = useSelector((store) => {
    return {
      ...store.questionReducer,
      question: store.questionReducer.question,
      responses: store.questionReducer.responses,
      submitClick: store.questionReducer.submitClick,
      error: store.errorReducer.error,
    };
  });
  const handleChangeField_txt = (key, value) => {
    dispatch({ type: "ADMIN_UPDATE_FIELD_TXT", payload: { key, value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const radios = [...elements].filter((r) => r.type === "radio");
    const r_checked = radios.find((r) => r.checked);
    const r_checked_value = r_checked.value;
    dispatch({ type: "GOOD_ONE", payload: { key: r_checked_value } });
    dispatch({ type: "SUBMIT_CLICK" });
  };

  const test = (key, value) => {
    // console.log(`${key} ${value}`);
    dispatch({ type: "TEST", payload: { key, value } });
  };
  // const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    const form = {
      question,
      category,
      responses,
    };
    if (form.question !== "") {
      console.log(form);
      dispatch((dispatch, getState) => createThunk(dispatch, getState, form));
      window.location.reload();
    }
  }, [submitClick]);

  return (
    <div className={` ${mc.container}`}>
      <div className={mc.up}>
        <BackBtn onClick={() => dispatch({ type: "RESET_STATE" })} />
        <h1>Ajouter des questions</h1>
      </div>
      <div className={mc.bottom}>
        {error && <p>{error}</p>}
        {/* {console.log(responses)} */}
        <form className={mc.formContainer} onSubmit={handleSubmit}>
          <h2>{category}</h2>
          <AdminInput
            nameClass={`inputBox`}
            type={"text"}
            spanName={"Question"}
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
                // onChange={handleRadioChange}
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
              value={responses.resp2.value}
              onChange={(e) => test("resp2", e.target.value)}
            />
            <div className={mc.radioContainer}>
              <input
                type="radio"
                name="GoodChoice"
                value={"resp2"}
                // onChange={handleRadioChange}
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
                // onChange={handleRadioChange}
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
                // onChange={handleRadioChange}
              />
              <label htmlFor="Response4">Bonne réponse</label>
            </div>
          </div>
          <Button textBtn={"Ajouter"} />
        </form>
      </div>
    </div>
  );
};

export default AdminForm;
