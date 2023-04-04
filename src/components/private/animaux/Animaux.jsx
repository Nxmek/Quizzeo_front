import React from "react";
import { useDispatch } from "react-redux";
import { readCatThunk } from "../../../api/questions/read-questions-by-cat.api";
import Questions from "../Questions/questions";

const Animaux = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Questions
        thunk={() => {
          dispatch((dispatch, getState) => {
            readCatThunk(dispatch, getState, "Animaux");
          });
        }}
      />
    </>
  );
};

export default Animaux;
