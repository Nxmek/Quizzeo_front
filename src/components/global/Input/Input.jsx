import mc from "./input.module.scss";
import hide_eye from "@/img/icon/hide-eye.svg";
import view_eye from "@/img/icon/view-eye.svg";

const Input = ({ type, spanName, value, onChange, nameClass, width }) => {
  return (
    // <div className={mc.inputBox}>
    <div className={mc[nameClass]}>
      <input
        type={type}
        required="required"
        value={value}
        onChange={onChange}
      />

      <span>{spanName}</span>
    </div>
  );
};
export default Input;
