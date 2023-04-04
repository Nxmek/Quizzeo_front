import mc from "./sign-up.module.scss";
import Buttons from "@/components/global/button/Button";
import Input from "@/components/global/Input/Input";
import PasswordInput from "@/components/global/password_Input/PasswordInput";
import logo from "@/img/logo_orange.svg";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpThunk } from "../../../api/user/sign-up.api";

const SignUP = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeRoute = () => {
    let path = "/";
    navigate(path);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = { email, password, confirmPassword };
    if (password !== confirmPassword) {
      dispatch({ type: "NOT_SAME_PASSWORD" });
      return;
    } else {
      dispatch({ type: "SAME_PASSWORD" });
    }
    dispatch((dispatch, getState) =>
      signUpThunk(dispatch, getState, form, changeRoute)
    );
  };

  const handleChangeField = (key, value) => {
    dispatch({ type: "UPDATE_FIELD_OPTI", payload: { key, value } });
  };
  const { email, password, confirmPassword, loading, samePassword, error } =
    useSelector((store) => {
      return {
        ...store.signUpReducer,
        loading: store.loadingReducer.loading,
        error: store.errorReducer.error,
      };
    });
  return (
    <div className="background">
      <div className={`container ${mc.container}`}>
        <div className={`adaptive-img-contain ${mc.logo}`}>
          <span>
            <img src={logo} alt="logo" />
          </span>
        </div>
        <h1>S'inscrire</h1>

        <form className={mc.formContener} onSubmit={(e) => handleSubmit(e)}>
          {error && <p className={mc.error}>{error}</p>}
          <Input
            nameClass={"inputBox"}
            type={"text"}
            spanName={"Adresse Mail"}
            value={email}
            onChange={(e) => handleChangeField("email", e.target.value)}
          />
          <PasswordInput
            nameClass={samePassword ? "inputBox" : "wrong"}
            spanName={
              samePassword ? "Mot de passe" : "Pas les mêmes mots de passe"
            }
            // spanName={"Mot de passe"}
            value={password}
            onChange={(e) => handleChangeField("password", e.target.value)}
          />
          <PasswordInput
            nameClass={samePassword ? "inputBox" : "wrong"}
            spanName={
              samePassword
                ? "Confirmation du mot de passe"
                : "Pas les mêmes mots de passe"
            }
            // nameClass={"inputBox"}
            // spanName={"Confirmation du mot de passe"}
            value={confirmPassword}
            onChange={(e) =>
              handleChangeField("confirmPassword", e.target.value)
            }
          />
          <Buttons disabled={loading} textBtn={`S'inscrire`} />
          <p>
            <Link to="/">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default SignUP;
