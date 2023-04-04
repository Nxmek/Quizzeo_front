import CategorieBtn from "@/components/global/categorie-btn/CategorieBtn";
import mc from "./categories.module.scss";
import histoireImg from "@/img/categeories/histoire.svg";
import sportImg from "@/img/categeories/sport.svg";
import animalImg from "@/img/categeories/animal.svg";
import cinemaImg from "@/img/categeories/cinema.svg";

const Categories = () => {
  return (
    <div className={`box ${mc.container}`}>
      <h1 className={mc.h1_cat}>Catégories</h1>
      <div className={mc.categorie_container}>
        <CategorieBtn
          name={"Histoire"}
          src={histoireImg}
          linkTo={"/Histoire"}
        />
        <CategorieBtn name={"Sport"} src={sportImg} linkTo={"/Sport"} />

        <CategorieBtn name={"Animaux"} src={animalImg} linkTo={"/Animaux"} />
        <CategorieBtn name={"Cinéma"} src={cinemaImg} />
      </div>
    </div>
  );
};
export default Categories;
