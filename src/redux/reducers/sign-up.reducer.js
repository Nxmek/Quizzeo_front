const signUpFormState = {
  pseudo: "",
  email: "",
  password: "",
  confirmPassword: "",
  samePassword: true,
};

const reducer = (state = signUpFormState, action) => {
  switch (action.type) {
    case "UPDATE_FIELD": {
      const key = action.payload.key;
      const value = action.payload.value;

      const newState = {
        ...state,
        [key]: value,
      };

      return newState;
    }
    case "UPDATE_FIELD_OPTI": {
      return { ...state, [action.payload.key]: action.payload.value };
    }
    // case "SAME_PASSWORD": {
    //   return { ...state, value: action.payload.value };
    // }

    case "NOT_SAME_PASSWORD": {
      return { ...state, samePassword: false };
    }
    case "SAME_PASSWORD": {
      return { ...state, samePassword: true };
    }
    default:
      return { ...state };
  }
};

export default reducer;
