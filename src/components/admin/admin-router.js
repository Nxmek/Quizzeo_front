import { Route, Routes } from "react-router-dom";
import MainTemplate from "../global/main-template/MainTemplate";
import Animaux from "../private/animaux/Animaux";
import Categories from "../private/categories/Categories";
import Histoire from "../private/histoire/Histoire";
import Sport from "../private/sport/Sport";
import AdminCat from "./admin_cat/AdminCat";
import AdminQuestion from "./adminQuestion/AdminQuestion";
import Err404 from "../global/err404/err404";
const AdminRouter = () => {
  return (
    <MainTemplate>
      <Routes>
        <Route path="/" element={<Categories />}></Route>

        <Route path="Histoire" element={<Histoire />}></Route>
        <Route path="Animaux" element={<Animaux />}></Route>
        <Route path="Sport" element={<Sport />}></Route>

        <Route path="admin" element={<AdminCat />}></Route>
        <Route
          path="admin-Histoire"
          element={<AdminQuestion category={"Histoire"} />}
        ></Route>
        <Route
          path="admin-Sport"
          element={<AdminQuestion category={"Sport"} />}
        ></Route>
        <Route
          path="admin-Animaux"
          element={<AdminQuestion category={"Animaux"} />}
        ></Route>
        <Route path="*" element={<Err404 />} />
      </Routes>
    </MainTemplate>
  );
};

export default AdminRouter;
