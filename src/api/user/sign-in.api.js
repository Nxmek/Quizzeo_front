import { hash } from "../../utils/crypto.utils";
import { handleErrors } from "../../utils/errors.utils";
import { setItem } from "../../utils/storage.utils";

const signIn = async (form) => {
  let status;
  const config = {
    method: "POST",
    body: JSON.stringify(form),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  try {
    const response = await fetch(`http://localhost:1960/users/sign-in`, config);
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

const formIsOk = (form) => {
  return true;
};

export const signInThunk = async (dispatch, getState, form, changeRoute) => {
  const loading = getState().loadingReducer.loading;
  if (loading) return;

  if (!formIsOk(form)) {
    return dispatch({
      type: "SET_SIGNIN_ERROR",
      payload: { error: `Champs incorrects` },
    });
  }

  dispatch({ type: "START_LOADING" });
  const { result, status } = await signIn({
    ...form,
    password: hash(form.password),
  });
  handleErrors(status, dispatch);

  dispatch({ type: "STOP_LOADING" });

  // if (!result?.token) {
  if (!result || !result.token) {
    return dispatch({
      type: "SET_SIGNIN_ERROR",
      payload: { error: `Mauvaise authentification` },
    });
  }

  const { token, user } = result;
  setItem("token", token);
  dispatch({ type: "RESET_SIGNIN_FORM" });
  dispatch({ type: "CONNECT_USER", payload: { ...user } });

  changeRoute();
};
