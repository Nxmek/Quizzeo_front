import { Route, Routes } from "react-router-dom";
import Categories from "@/components/private/categories/Categories";
import MainTemplate from "../global/main-template/MainTemplate";
import Histoire from "./histoire/Histoire";
import Sport from "./sport/Sport";
import Animaux from "./animaux/Animaux";
import Err404 from "../global/err404/err404";

const PrivateRouter = () => {
  return (
    <MainTemplate>
      <Routes>
        <Route index path="/" element={<Categories />}></Route>

        <Route path="Histoire" element={<Histoire />}></Route>
        <Route path="Animaux" element={<Animaux />}></Route>
        <Route path="Sport" element={<Sport />}></Route>
        <Route path="*" element={<Err404 />} />
      </Routes>
    </MainTemplate>
  );
};

export default PrivateRouter;
