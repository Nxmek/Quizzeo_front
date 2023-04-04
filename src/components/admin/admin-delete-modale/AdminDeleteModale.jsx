import React from "react";
import { useDispatch } from "react-redux";
import { deleteQuestionThunk } from "../../../api/questions/delete.api";
import mc from "./admin-delete-modal.module.scss";
const AdminDeleteModale = ({ id }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch((dispatch, getState) =>
      deleteQuestionThunk(dispatch, getState, id)
    );
    window.location.reload();
  };
  const handleCancel = (id) => {
    dispatch({ type: "HIDE_DELETE" });
  };
  return (
    <div className={mc.body}>
      <div className={mc.container}>
        <h3>Souhaitez vous vraiment supprimer cette question ? </h3>
        <div className={mc.buttons}>
          <button
            className={mc.cancel}
            onClick={() => {
              handleCancel();
            }}
          >
            Annuler
          </button>
          <button
            className={mc.delete}
            onClick={() => {
              handleDelete(id);
            }}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDeleteModale;
