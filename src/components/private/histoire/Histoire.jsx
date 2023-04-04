import React from "react";
import { useDispatch } from "react-redux";
import {
  readCatThunk,
  readHistoryThunk,
} from "../../../api/questions/read-questions-by-cat.api";
import Questions from "../Questions/questions";

const Histoire = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Questions
        thunk={() => {
          dispatch((dispatch, getState) => {
            readCatThunk(dispatch, getState, "Histoire");
          });
        }}
      />
    </>
  );
};

export default Histoire;
