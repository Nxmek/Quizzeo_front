const signInFormState = {
  email: "",
  password: "",
  error: null,
};

const reducer = (state = signInFormState, action) => {
  switch (action.type) {
    case "UPDATE_SIGNIN_FIELD": {
      return { ...state, [action.payload.key]: action.payload.value };
    }
    case "RESET_SIGNIN_FORM": {
      return { ...state, ...signInFormState };
    }
    case "SET_SIGNIN_ERROR": {
      return { ...state, error: action.payload.error };
    }
    default:
      return { ...state };
  }
};

export default reducer;
