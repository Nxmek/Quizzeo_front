import mc from "./categorie-btn.module.scss";
import { Link } from "react-router-dom";
const CategorieBtn = ({ name, src, linkTo }) => {
  return (
    <Link to={linkTo} className={mc.link}>
      <div className={mc.container}>
        <div className={`adaptive-img-contain ${mc.logo}`}>
          <span>
            <img src={src} alt={name} />
          </span>
        </div>
        <h2>{name}</h2>
      </div>
    </Link>
  );
};
export default CategorieBtn;
