export const handleErrors = (status, dispatch) => {
  switch (status) {
    case 400:
      dispatch({
        type: "AUTH_ERR",
        payload: { value: "Les données sont incorrectes" },
      });
      break;
    case 401:
      dispatch({
        type: "AUTH_ERR",
        payload: { value: "Mauvaise authentification" },
      });
      break;
    case 403:
      dispatch({
        type: "AUTH_ERR",
        payload: { value: "L'utilisateur existe deja" },
      });
      break;
    default:
      dispatch({ type: "AUTH_ERR", payload: { value: "Erreur du serveur" } });
      break;
  }
};
export const handleCreateErrors = (status, dispatch) => {
  switch (status) {
    case 400:
      dispatch({
        type: "AUTH_ERR",
        payload: { value: "Erreur" },
      });
      break;
    case 401:
      dispatch({
        type: "AUTH_ERR",
        payload: { value: "Erreur" },
      });
      break;
    case 403:
      dispatch({
        type: "AUTH_ERR",
        payload: { value: "Erreur" },
      });
      break;
    default:
      dispatch({ type: "AUTH_ERR", payload: { value: "Erreur du serveur" } });
      break;
  }
};
