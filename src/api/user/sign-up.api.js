import { hash } from "../../utils/crypto.utils";
import { handleErrors } from "../../utils/errors.utils";
import { setItem } from "../../utils/storage.utils";
const signUp = async (form) => {
  let status;
  const config = {
    method: "POST",
    body: JSON.stringify(form),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  try {
    // const response = await fetch(
    //   `https://quizzeo-back.vercel.app/users/sign-up`,
    //   config
    // );
    const response = await fetch(`http://localhost:1960/users/sign-up`, config);
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
  if (form.password !== form.confirmPassword) return false;
  return true;
};

export const signUpThunk = async (dispatch, getState, form, changeRoute) => {
  const loading = getState().loadingReducer.loading;
  if (loading) return;

  if (!formIsOk(form)) {
    return dispatch({
      type: "SET_SIGNUP_ERROR",
      payload: { error: `Champs incorrects` },
    });
  }

  dispatch({ type: "START_LOADING" });

  const { result, status } = await signUp({
    ...form,
    password: hash(form.password),
    confirmPassword: hash(form.confirmPassword),
  });
  handleErrors(status, dispatch);
  // const result = await signUp({
  //   ...form,
  //   password: hash(form.password),
  //   confirmPassword: hash(form.confirmPassword),
  // });
  dispatch({ type: "STOP_LOADING" });

  // if (!result?.token) {
  if (!result || !result.token) {
    return dispatch({
      type: "SET_SIGNUP_ERROR",
      payload: { error: `Email déjà existant` },
    });
  }

  const { token, user } = result;
  setItem("token", token);
  dispatch({ type: "RESET_SIGNUP_FORM" });
  dispatch({ type: "CONNECT_USER", payload: { ...user } });
  changeRoute();
};
