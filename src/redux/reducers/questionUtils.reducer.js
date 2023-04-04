const initiaQuestionUtilsState = {
  questionNumber: 0,
  score: 0,
  url: "",
  clickIsDisabled: false,
  activeID: null,
  showValidateBtn: false,
  goodResponse: 0,
  showResult: false,
  resultModal: true,
  details: false,
};

const reducer = (state = initiaQuestionUtilsState, action) => {
  switch (action.type) {
    case "READ_URL":
      return { ...state, url: action.url };
    case "INCREMENT_NUMBER_OF_QUESTION":
      return { ...state, questionNumber: state.questionNumber + 1 };
    case "RESET_NUMBER_OF_QUESTION":
      return { ...state, questionNumber: 0 };
    case "INCREMENT_SCORE":
      return { ...state, score: state.score + 2 };
    case "RESET_SCORE":
      return { ...state, score: 0 };
    case "DISABLE_CLICK":
      return { ...state, clickIsDisabled: !state.clickIsDisabled };
    case "SELECT":
      return { ...state, activeID: action.payload };
    case "SELECT_RESET":
      return { ...state, activeID: null };
    case "SHOW_VALIDATE":
      return { ...state, showValidateBtn: true };
    case "HIDE_VALIDATE":
      return { ...state, showValidateBtn: false };
    case "SHOW_RESULT":
      const selected = action.payload.response;
      const isGood = selected.good_one;
      return {
        ...state,
        showResult: true,
        score: isGood ? state.score + 2 : state.score,
      };
    case "HIDE_RESULT":
      return { ...state, showResult: false };

    //pour afficher le score et le temps
    case "SHOW_DETAILS":
      return { ...state, details: true };
    case "HIDE_DETAILS":
      return { ...state, details: false };

    default:
      return { ...state };
  }
};

export default reducer;
