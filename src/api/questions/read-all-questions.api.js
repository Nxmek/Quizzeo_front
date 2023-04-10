import { getItem } from "../../utils/storage.utils";

const read = async () => {
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
      `https://quizzeo-back-jmpar.ondigitalocean.app/question/read/`,
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

export const readThunk = async (dispatch, getState) => {
  // console.log(getState());

  const loading = getState().loadingReducer.loading;
  if (loading) return;

  dispatch({ type: "START_LOADING" });

  const response = await read();
  dispatch({ type: "STOP_LOADING" });

  if (!response) return console.error("cannot load questions");

  dispatch({ type: "READ_QUESTIONS", payload: { questions: response } });
};
