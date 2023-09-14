import { getItem } from "../../utils/storage.utils";

const readIdQuestion = async (id) => {
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
      `http://localhost:1960/question/readById/${id}`,
      config
    );
    const result = await response.json();
    // console.log(result);
    if (!result || !result.question) {
      return null;
    } else {
      return result.question;
    }
  } catch (e) {
    console.error("Problem with request : ", e.message);
    return null;
  }
};
export const readIdThunkAdmin = async (dispatch, getState, id) => {
  // console.log(getState());

  const loading = getState().loadingReducer.loading;
  if (loading) return;

  dispatch({ type: "START_LOADING" });

  const response = await readIdQuestion(id);

  dispatch({ type: "STOP_LOADING" });
  if (!response) return console.error("cannot load this question");
  dispatch({
    type: "READ_QUESTIONS_BY_ID_ADMIN",
    payload: { question: response },
  });
};
