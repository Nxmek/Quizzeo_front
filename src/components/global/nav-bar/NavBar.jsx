import mc from "./nav-bar.module.scss";
import logoutImg from "../../../img/icon/logout.svg";
import logo_orange from "../../../img/logo_orange.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import CountDown from "../countdown/Countdown";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { score, url, details } = useSelector((store) => {
    return { ...store.questionUtilsReducer };
  });

  const logout = () => {
    dispatch({ type: "DISCONNECT_USER" });
    window.localStorage.clear();
    navigate("/");
  };
  /*---------------------------------------*/

  /*---------------------------------------*/

  useEffect(() => {
    const path = window.location.pathname;
    const url = path.substring(path.lastIndexOf("/") + 1);
    dispatch({ type: "READ_URL", url });
    dispatch({ type: "HIDE_DETAILS" });
  }, [window.location.pathname]);

  return (
    <>
      <div className={mc.container}>
        <Link
          to={"/"}
          onClick={() => {
            dispatch({ type: "STOP" });
          }}
        >
          <div className={`adaptive-img-contain ${mc.logo}`}>
            <span>
              <img src={logo_orange} alt="" />
            </span>
          </div>
        </Link>
        {/* {showContent && <p>{showContent}</p>} */}
        {details ? (
          <div className={mc.details}>
            <h4>{url}</h4>
            <CountDown />
            <div className={mc.score}>
              <p>
                <span>Score: </span>
                {score.toString().padStart(2, "0")}/20
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className={mc.button}>
          <a onClick={logout}>
            <img src={logoutImg} alt="" />
            <span>Déconnexion</span>
          </a>
        </div>
      </div>

      <div className={mc.container_mobile}>
        <div className={mc.up}>
          <Link
            to={"/"}
            onClick={() => {
              dispatch({ type: "STOP" });
            }}
          >
            <div className={`adaptive-img-contain ${mc.logo_mobile}`}>
              <span>
                <img src={logo_orange} alt="" />
              </span>
            </div>
          </Link>
          <div className={mc.button_mobile}>
            <a onClick={logout}>
              <img src={logoutImg} alt="" />
            </a>
          </div>
        </div>

        {details ? (
          <div className={mc.details_mobile}>
            <CountDown />
            <div className={mc.score_mobile}>
              <p>
                <span>Score: </span>
                {score.toString().padStart(2, "0")}/20
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default NavBar;
