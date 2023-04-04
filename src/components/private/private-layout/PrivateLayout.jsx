import { Outlet } from "react-router-dom";
import mc from "./private-layout.module.scss";

const PrivateLayout = () => {
  return (
    <div className={mc.test}>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
