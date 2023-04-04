import { handleCreateErrors } from "../../utils/errors.utils";
import { getItem } from "../../utils/storage.utils";

const update = async (form, questionId) => {
  const token = getItem("token");

  let status;
  const config = {
    method: "PUT",
    body: JSON.stringify(form),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token,
    },
  };
  console.log(questionId);
  try {
    const response = await fetch(
      `http://localhost:1960/question/update/${questionId}`,
      config
    );
    const result = await response.json();
    status = response.status;
    // return !result || status >= 400 ? null : result;
    return {
      status,
      result,
    };
  } catch (e) {
    console.error("Problem with request : ", e.message);
    return {
      status: 500,
      result: null,
    };
  }
};

export const updateThunk = async (dispatch, getState, form, questionId) => {
  const loading = getState().loadingReducer.loading;
  if (loading) return;

  dispatch({ type: "START_LOADING" });
  const { status } = await update(form, questionId);
  if (status >= 400) {
    handleCreateErrors(status, dispatch);
  }
  dispatch({ type: "STOP_LOADING" });

  // if (!response) return handleError(dispatch, ERROR.cannotCreate);

  //   dispatch({ type: "UPDATE_QUESTION", payload: { form, questionId } });
};
