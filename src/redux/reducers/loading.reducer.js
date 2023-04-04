const initialLoadingState = {
  loading: false,
};

const reducer = (state = initialLoadingState, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, loading: true };
    case "STOP_LOADING":
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};

export default reducer;
