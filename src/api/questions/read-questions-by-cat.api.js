import { getItem } from "../../utils/storage.utils";

const readCatQuestions = async (category) => {
  const token = getItem("token");

  const config = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token,
    },
  };

  try {
    const response = await fetch(
      `http://localhost:1960/question/read/${category}`,
      config
    );
    const result = await response.json();
    // console.log(result);
    if (!result || !result.questions) {
      // logout();
      return null;
    } else {
      return result.questions;
    }
  } catch (e) {
    console.error("Problem with request : ", e.message);
    return null;
  }
};

export const readCatThunkAdmin = async (dispatch, getState, category) => {
  // console.log(getState());

  const loading = getState().loadingReducer.loading;
  if (loading) return;

  dispatch({ type: "START_LOADING" });

  const response = await readCatQuestions(category);

  dispatch({ type: "STOP_LOADING" });
  // console.log(response);
  if (!response) return console.error("cannot load questions");

  dispatch({
    type: "READ_QUESTIONS_BY_CAT_ADMIN",
    payload: { questions: response },
  });
};

export const readCatThunk = async (dispatch, getState, category) => {
  // console.log(getState());

  const loading = getState().loadingReducer.loading;
  if (loading) return;

  dispatch({ type: "START_LOADING" });

  const response = await readCatQuestions(category);

  dispatch({ type: "STOP_LOADING" });
  // console.log(response);
  if (!response) return console.error("cannot load questions");

  dispatch({
    type: "READ_QUESTIONS_BY_CAT",
    payload: { questions: response },
  });
};
