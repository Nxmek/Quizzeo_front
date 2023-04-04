const initialUserState = {
  email: "",
  pseudo: null,
  isLogged: false,
  role: "",
};

const reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "CONNECT_USER":
      const { email } = action.payload;
      return { ...state, email, isLogged: true };
    case "DISCONNECT_USER":
      // return { ...state, email: "", pseudo: null, isLogged: false };
      return { ...initialUserState };
    case "CHECK_ROLE": {
      const role = action.payload.role;
      return { ...state, role: role };
    }
    default:
      return { ...state };
  }
};

export default reducer;
