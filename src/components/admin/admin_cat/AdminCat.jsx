import React from "react";
import mc from "./admin-cat.module.scss";
import histoireImg from "../../../img/categeories/histoire.svg";
import sportImg from "../../../img/categeories/sport.svg";
import animalImg from "../../..//img/categeories/animal.svg";
import cinemaImg from "../../../img/categeories/cinema.svg";
import CategorieBtn from "../../global/categorie-btn/CategorieBtn";

const AdminCat = () => {
  return (
    <div className={mc.container}>
      <h1 className={mc.h1_admin}>Admin</h1>
      <div className={mc.btnContainer}>
        <CategorieBtn
          name={"Histoire"}
          src={histoireImg}
          linkTo={"/admin-Histoire"}
        />
        <CategorieBtn name={"Sport"} src={sportImg} linkTo={"/admin-Sport"} />

        <CategorieBtn
          name={"Animaux"}
          src={animalImg}
          linkTo={"/admin-Animaux"}
        />
        <CategorieBtn name={"Cinéma"} src={cinemaImg} />
      </div>
    </div>
  );
};

export default AdminCat;
