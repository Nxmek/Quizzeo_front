import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import signUpReducer from "./sign-up.reducer";
import signInReducer from "./sign-in.reducer";
import loadingReducer from "./loading.reducer";
import questionReducer from "./question.reducer";
import questionUtilsReducer from "./questionUtils.reducer";
import countdownReducer from "./countdown.reducer";
import errorReducer from "./errors.reducer";

const finalReducer = combineReducers({
  signUpReducer: signUpReducer,
  signInReducer,
  userReducer,
  loadingReducer,
  questionReducer,
  questionUtilsReducer,
  countdownReducer,
  errorReducer,
});
export default finalReducer;
