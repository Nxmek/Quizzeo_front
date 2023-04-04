import mc from "./login.module.scss";
import logo from "@/img/logo_orange.svg";
import Input from "@/components/global/Input/Input";
import PasswordInput from "@/components/global/password_Input/PasswordInput";
import Buttons from "@/components/global/button/Button";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInThunk } from "../../../api/user/sign-in.api";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeRoute = () => {
    let path = "/";
    navigate(path);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = { email, password };
    dispatch((dispatch, getState) =>
      signInThunk(dispatch, getState, form, changeRoute)
    );
  };
  const handleChangeField = (key, value) => {
    dispatch({ type: "UPDATE_SIGNIN_FIELD", payload: { key, value } });
  };
  const { email, password, loading, error } = useSelector((store) => ({
    ...store.signInReducer,
    loading: store.loadingReducer.loading,
    error: store.errorReducer.error,
  }));

  return (
    <div className="background">
      <div className={`container ${mc.container}`}>
        <div className={`adaptive-img-contain ${mc.logo}`}>
          <span>
            <img src={logo} alt="logo" />
          </span>
        </div>
        <h1>Se connecter</h1>

        <form onSubmit={(e) => handleSubmit(e)} className={mc.formContener}>
          {error && <p className={mc.error}>{error}</p>}

          <Input
            nameClass="inputBox"
            type={"text"}
            spanName={"Adresse Mail"}
            value={email}
            onChange={(e) => handleChangeField("email", e.target.value)}
          />
          <PasswordInput
            nameClass="inputBox"
            password={password}
            spanName={"Mot de passe "}
            value={password}
            onChange={(e) => handleChangeField("password", e.target.value)}
          />

          <Buttons disabled={loading} textBtn={"Se connecter"} />
          <p>
            <Link to="/inscription">Vous n'êtes pas inscrit ? Cliquez ici</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
