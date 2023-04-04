import mc from "./admin-input.module.scss";

const AdminInput = ({ type, spanName, value, onChange, nameClass, width }) => {
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
export default AdminInput;
