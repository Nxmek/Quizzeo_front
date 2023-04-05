import mc from "./password-input.module.scss";
import hide_eye from "../../../img/icon/hide-eye.svg";
import view_eye from "../../../img/icon/view-eye.svg";
import { useState } from "react";

const PasswordInput = ({ spanName, value, onChange, nameClass }) => {
  const handlePass = () => {
    setHidepass(!hidepass);
  };
  const [hidepass, setHidepass] = useState(true);
  return (
    // <div className={mc.inputBox}>
    <div className={mc[nameClass]}>
      <input
        type={hidepass ? "password" : "text"}
        required="required"
        value={value}
        onChange={onChange}
      />
      <div className={mc.password_icon} onClick={handlePass}>
        {hidepass ? (
          <>
            <div className={`adaptive-img-contain ${mc.off}`}>
              <span>
                <img src={hide_eye} alt="icon oeil fermé" />
              </span>
            </div>
          </>
        ) : (
          <>
            <div className={`adaptive-img-contain ${mc.on}`}>
              <span>
                <img src={view_eye} alt="icon oeil ouvert" />
              </span>
            </div>
          </>
        )}
      </div>
      <span>{spanName}</span>
    </div>
  );
};
export default PasswordInput;
