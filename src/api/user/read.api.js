import { getItem } from "../../utils/storage.utils";

const readIdUser = async () => {
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
      `https://quizzeo-back-jmpar.ondigitalocean.app/users/readById`,
      config
    );
    const result = await response.json();
    if (!result || !result.user) {
      // logout();
      return null;
    } else {
      return result.user;
    }
  } catch (e) {
    console.error("Problem with request : ", e.message);
    return null;
  }
};

export const readUserThunk = async (dispatch, getState) => {
  const loading = getState().loadingReducer.loading;
  if (loading) return;

  dispatch({ type: "START_LOADING" });

  const response = await readIdUser();

  dispatch({ type: "STOP_LOADING" });
  if (!response) return console.error("cannot load user");

  dispatch({ type: "CHECK_ROLE", payload: { role: response.role } });
};
