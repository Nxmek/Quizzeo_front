const adminFormState = {
  questions: [],
  error: null,
  theQuestion: "",
  sortedQuestions: [],
  //
  showDeleteModale: false,
  showAddQuestion: false,
  question: "",
  category: "",
  responses: {
    resp1: {
      value: "",
      good_one: false,
    },
    resp2: {
      value: "",
      good_one: false,
    },
    resp3: {
      value: "",
      good_one: false,
    },
    resp4: {
      value: "",
      good_one: false,
    },
  },
  form: "",
  //
  submitClick: false,
  modifyQuestion: false,
  questionId: "",
  settingsModal: false,
};

const reducer = (state = adminFormState, action) => {
  switch (action.type) {
    case "ADD_QUESTION": {
      const form = action.payload.form;
      console.log(form);
      return {
        ...state,
        form: {
          theQuestion: state.question,
          category: "",
          responses: [state.resp1, state.resp2, state.resp3, state.resp4],
        },
      };
    }
    case "UPDATE_QUESTION": {
      const questionId = action.payload.questionId;
      const questionToUpdate = state.questions.find(
        (question) => question._id === questionId
      );

      console.log(questionToUpdate.responses);

      return {
        ...state,
        form: {
          theQuestion: questionToUpdate.theQuestion,
          category: questionToUpdate.category,
          responses: {
            resp1: {
              value: questionToUpdate.responses[0].value,
              good_one: questionToUpdate.responses[0].good_one,
            },
            resp2: {
              value: questionToUpdate.responses[1].value,
              good_one: questionToUpdate.responses[1].good_one,
            },
            resp3: {
              value: questionToUpdate.responses[2].value,
              good_one: questionToUpdate.responses[2].good_one,
            },
            resp4: {
              value: questionToUpdate.responses[3].value,
              good_one: questionToUpdate.responses[3].good_one,
            },
          },
        },
      };
    }
    case "DELETE_QUESTION": {
      const questionId = action.payload.questionId;
      const newList = state.questions.filter(
        (question) => question.id !== questionId
      );
      return { ...state, questions: [...newList] };
    }

    case "READ_QUESTIONS": {
      const questions = action.payload.questions;
      return { ...state, questions: [...questions] };
    }
    case "READ_QUESTIONS_BY_CAT_ADMIN": {
      const questions = action.payload.questions;
      return { ...state, questions: [...questions] };
    }
    case "READ_QUESTIONS_BY_CAT": {
      const question = action.payload.questions;
      const sortedArr = [...question]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
      return { ...state, sortedQuestions: [...sortedArr] };
    }

    case "READ_QUESTIONS_BY_ID_ADMIN": {
      const form = action.payload.question;
      return {
        ...state,
        modifyQuestion: true,
        question: form.theQuestion,
        responses: {
          resp1: form.responses[0],
          resp2: form.responses[1],
          resp3: form.responses[2],
          resp4: form.responses[3],
        },
      };
    }

    case "ADMIN_UPDATE_FIELD_TXT": {
      const key = action.payload.key;
      const value = action.payload.value;

      const newState = {
        ...state,
        [key]: value,
      };

      return newState;
    }

    case "TEST": {
      const key = action.payload.key;
      const value = action.payload.value;

      return {
        ...state,
        responses: {
          ...state.responses,
          [key]: {
            value: value,
            good_one: state.responses[key].good_one,
          },
        },
      };
    }

    case "ADMIN_UPDATE_FIELD": {
      const key = action.payload.key;
      const value = action.payload.value;

      const newState = {
        ...state,
        [key]: { ...state[key], value },
      };

      return newState;
    }
    case "SHOW_ADD": {
      return { ...state, showAddQuestion: true };
    }
    case "HIDE_ADD": {
      return { ...state, showAddQuestion: false };
    }
    case "SHOW_DELETE": {
      return { ...state, showDeleteModale: true };
    }
    case "HIDE_DELETE": {
      return { ...state, showDeleteModale: false };
    }
    case "SHOW_MODIFY": {
      return { ...state, modifyQuestion: true };
    }
    case "HIDE_MODIFY": {
      return { ...state, modifyQuestion: false };
    }
    // case "SHOW_SETTINGS_MODAL": {
    //   return { ...state, settingsModal: true };
    // }
    case "SHOW_SETTINGS_MODAL": {
      return { ...state, settingsModal: !state.settingsModal };
    }

    case "SUBMIT_CLICK": {
      return { ...state, submitClick: true };
    }
    case "SAVE_ID": {
      const id = action.payload.id;
      return { ...state, questionId: id };
    }
    case "RESET_STATE": {
      return {
        ...state,
        showDeleteModale: false,
        showAddQuestion: false,
        question: "",
        category: "",
        responses: {
          resp1: {
            value: "",
            good_one: false,
          },
          resp2: {
            value: "",
            good_one: false,
          },
          resp3: {
            value: "",
            good_one: false,
          },
          resp4: {
            value: "",
            good_one: false,
          },
        },
        form: "",
        //
        submitClick: false,
        modifyQuestion: false,
      };
    }
    case "GOOD_ONE": {
      const key = action.payload.key;
      const keys = Object.keys(state.responses); // tableau resp1 ....resp4
      const responses = keys.reduce((newRespObject, key) => {
        // const [key] = { value: state.responses[key].value, good_one: false };
        return {
          ...newRespObject,
          [key]: {
            value: state.responses[key].value,
            good_one: false,
          },
        };
      }, {});
      return {
        ...state,
        responses: {
          ...responses,
          //pour mettre tout les good one a false
          [key]: {
            value: state.responses[key].value,
            good_one: true,
          },
        },
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
