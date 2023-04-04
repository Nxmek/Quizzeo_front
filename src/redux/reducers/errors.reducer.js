const errorsState = {
  error: null,
};

const reducer = (state = errorsState, action) => {
  switch (action.type) {
    case "AUTH_ERR": {
      return { ...state, error: action.payload.value };
    }
    default:
      return { ...state };
  }
};

export default reducer;
