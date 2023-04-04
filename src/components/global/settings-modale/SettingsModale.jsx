import React, { useEffect } from "react";
import mc from "./settings-modale.module.scss";
import modify from "../../../img/icon/modify.svg";
import deleteSvg from "../../../img/icon/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { readIdThunkAdmin } from "../../../api/questions/read-questions-by-id.api";
import AdminUpdateForm from "../../admin/adminUpdateForm/AdminUpdateForm";
import { readCatThunkAdmin } from "../../../api/questions/read-questions-by-cat.api";
import AdminDeleteModale from "../../admin/admin-delete-modale/AdminDeleteModale";
const SettingsModale = ({ c, category }) => {
  const dispatch = useDispatch();
  const { modifyQuestion, showDeleteModale } = useSelector((store) => {
    return {
      modifyQuestion: store.questionReducer.modifyQuestion,
      showDeleteModale: store.questionReducer.showDeleteModale,
    };
  });

  return (
    <div className={mc.container}>
      <div
        className={mc.action}
        onClick={() => {
          {
            dispatch({ type: "SAVE_ID", payload: { id: c._id } });
            dispatch((dispatch, getState) => {
              readIdThunkAdmin(dispatch, getState, c._id);
            });
          }
        }}
      >
        <div>
          <img src={modify} alt="" />
        </div>
        <div>Modifier</div>
      </div>
      <div
        className={mc.action}
        onClick={() => {
          {
            dispatch({ type: "SHOW_DELETE" });
          }
        }}
      >
        <div>
          <img src={deleteSvg} alt="" />
        </div>
        <div>Supprimer</div>
      </div>
      {modifyQuestion && <AdminUpdateForm category={category} />}
      {console.log(c._id)}
      {showDeleteModale && <AdminDeleteModale id={c._id} />}
    </div>
  );
};

export default SettingsModale;
