import { handleCreateErrors } from "../../utils/errors.utils";
import { getItem } from "../../utils/storage.utils";

const create = async (form) => {
  let status;
  const token = getItem("token");

  const config = {
    method: "POST",
    body: JSON.stringify(form),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token,
    },
  };
  console.log(form);
  try {
    const response = await fetch(
      `http://localhost:1960/question/create`,
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

export const createThunk = async (dispatch, getState, form) => {
  const loading = getState().loadingReducer.loading;
  if (loading) return;

  dispatch({ type: "START_LOADING" });
  const { status } = await create(form);
  handleCreateErrors(status, dispatch);
  dispatch({ type: "STOP_LOADING" });

  // if (!response) return handleError(dispatch, ERROR.cannotCreate);

  dispatch({ type: "ADD_QUESTION", payload: { form } });
};
