import { Route, Routes } from "react-router-dom";
import Login from "@/components/public/login/Login";
import SignUp from "@/components/public/signUp/SignUp";
import PublicLayout from "@/components/public/public-layout/PublicLayout";
import Err404 from "../global/err404/err404";
const PublicRouter = ({ setIsLogged }) => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index path="/" element={<Login setIsLogged={setIsLogged} />} />
        <Route
          path="inscription"
          element={<SignUp setIsLogged={setIsLogged} />}
        />
      </Route>
      <Route path="*" element={<Err404 />} />
    </Routes>
  );
};

export default PublicRouter;
