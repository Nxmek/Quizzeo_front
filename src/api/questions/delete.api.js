import { getItem } from "../../utils/storage.utils";
import { stringIsFilled } from "../../utils/string.utils";

const deleteRequest = async (token, questionId) => {
  const config = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token,
    },
  };

  try {
    const response = await fetch(
      `https://quizzeo-back-jmpar.ondigitalocean.app/question/delete/${questionId}`,
      config
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (e) {
    console.error(`delete question request :  ${e.message}`);
    return null;
  }
};

export const deleteQuestionThunk = async (dispatch, getState, questionId) => {
  const loading = getState().loadingReducer.loading;
  if (loading) return;
  if (!stringIsFilled(questionId)) return console.error(`id not set`);
  const token = getItem("token");
  dispatch({ type: "START_LOADING" });
  const response = await deleteRequest(token, questionId);
  dispatch({ type: "STOP_LOADING" });

  if (!response) return console.error(`cannot delete question`);

  dispatch({ type: "DELETE_QUESTION", payload: { questionId: response } });
};
