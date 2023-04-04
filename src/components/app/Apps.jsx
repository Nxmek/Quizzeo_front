import { useEffect } from "react";
import mc from "./app.module.scss";
import { getItem } from "@/utils/storage.utils";
import PublicRouter from "@/components/public/PublicRouter";
import PrivateRouter from "@/components/private/PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { readUserThunk } from "../../api/user/read.api";
import AdminRouter from "../admin/admin-router";
const App = () => {
  const dispatch = useDispatch();

  const { isLogged, role } = useSelector((store) => {
    return store.userReducer;
  });
  useEffect(() => {
    const token = getItem("token");
    if (!!token?.trim()) {
      dispatch({ type: "CONNECT_USER", payload: { email: "" } });
    } else {
      dispatch({ type: "DISCONNECT_USER" });
    }
  }, []);

  useEffect(() => {
    if (!isLogged) return;
    dispatch((dispatch, getState) => {
      readUserThunk(dispatch, getState);
    });
  }, [isLogged]);

  return (
    <div className={mc.app}>
      {/* {isLogged ? <PrivateRouter /> : <PublicRouter />} */}
      {!isLogged ? (
        <PublicRouter />
      ) : isLogged && role === 1 ? (
        <AdminRouter />
      ) : (
        <PrivateRouter />
      )}
    </div>
  );
};
export default App;
