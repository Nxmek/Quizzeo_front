const initiaCountdownUtilsState = {
  initTime: 150,
  time: 150,
  startTimer: false,
  showEndQuiz: false,
};

const reducer = (state = initiaCountdownUtilsState, action) => {
  switch (action.type) {
    case "TIMER":
      return { ...state, time: state.startTimer ? state.time - 1 : state.time };

    case "START":
      return {
        ...state,
        startTimer: true,
      };
    case "STOP":
      return {
        ...state,
        ...initiaCountdownUtilsState,
      };
    case "SHOW_END_QUIZ":
      return { ...state, showEndQuiz: true };
    // case "SHOW_END_QUIZ":
    //   return { ...state, showEndQuiz: true };
    case "RESET_TIMER":
      return { ...state, ...initiaCountdownUtilsState };
    default:
      return { ...state };
  }
};

export default reducer;
