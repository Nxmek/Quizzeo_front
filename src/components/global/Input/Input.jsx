import mc from "./input.module.scss";

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
