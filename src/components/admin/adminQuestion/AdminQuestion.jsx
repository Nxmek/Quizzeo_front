import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCatThunkAdmin } from "../../../api/questions/read-questions-by-cat.api";
import mc from "./admin-question.module.scss";
import AdminForm from "../../admin/adminForm/AdminForm";
import Buttons from "../../global/button/Button";
import BackBtn from "../../global/back-btn/BackBtn";
import { Link } from "react-router-dom";
import AdminDeleteModale from "../admin-delete-modale/AdminDeleteModale";
import SettingsModale from "../../global/settings-modale/SettingsModale";
import AdminUpdateForm from "../adminUpdateForm/AdminUpdateForm";
import { readIdThunkAdmin } from "../../../api/questions/read-questions-by-id.api";
import deleteBtn from "../../../img/icon/delete.svg";
import modify from "../../../img/icon/modify.svg";
const AdminQuestion = ({ category }) => {
  const dispatch = useDispatch();
  const {
    questions,
    showAddQuestion,
    showDeleteModale,
    settingsModal,
    questionId,
    modifyQuestion,
  } = useSelector((store) => {
    return {
      ...store.questionReducer,
    };
  });

  const showAdd = () => {
    if (showAddQuestion) {
      return <AdminForm category={category} />;
    } else {
      return "";
    }
  };

  const showSettingsModale = (c) => {
    if (settingsModal) {
      return <SettingsModale c={c} category={category} />;
    } else {
      return "";
    }
  };

  /*---------------useEffect-------------*/
  useEffect(() => {
    showAdd();
  }, [showAddQuestion]);

  useEffect(() => {
    dispatch((dispatch, getState) => {
      readCatThunkAdmin(dispatch, getState, category);
    });
  }, []);
  return (
    <div className={mc.contain}>
      <div className={mc.up}>
        <Link to={"../admin"} className={mc.backBtn}>
          <BackBtn />
        </Link>
        <h2>{category}</h2>
        <div className={mc.addBtnContain}>
          <Buttons
            textBtn={"+"}
            onClick={() => dispatch({ type: "SHOW_ADD" })}
          />
        </div>
      </div>

      <ul>
        {questions.map((c) => (
          <li key={c._id} className={mc.questionBlock}>
            <div className={mc.upBlock}>
              <h5>{c.theQuestion}</h5>
              {c._id === questionId ? showSettingsModale(c) : ""}
              <div
                onClick={() => {
                  dispatch({ type: "SHOW_SETTINGS_MODAL" });
                  dispatch({ type: "SAVE_ID", payload: { id: c._id } });
                }}
                className={mc.ellipsis}
              >
                <div className={mc.dot}></div>
                <div className={mc.dot}></div>
                <div className={mc.dot}></div>
              </div>
            </div>

            <ul>
              {c.responses.map((r) => (
                <li key={r._id} className={mc.repBlock}>
                  <div>
                    {r.value}
                    <span>{r.good_one ? " ✅" : ""}</span>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {showAdd()}
    </div>
  );
};

export default AdminQuestion;

// <div className={mc.buttons}>
// {modifyQuestion && <AdminUpdateForm category={category} />}
// <button
//   className={mc.modifyBtn}
//   onClick={() => {
//     {
//       dispatch({ type: "SAVE_ID", payload: { id: c._id } });
//       dispatch((dispatch, getState) => {
//         readIdThunkAdmin(dispatch, getState, c._id);
//       });
//     }
//   }}
// >
//   {/* <img src={modify} alt="" /> */}
//   ✍🏻
// </button>
// {showDelete(c._id)}

// <button
//   className={mc.deleteBtn}
//   onClick={() => {
//     {
//       dispatch({ type: "SHOW_DELETE" });
//     }
//   }}
// >
//   🗑️
//   {/* <img src={deleteBtn} alt="" /> */}
// </button>
// </div>
