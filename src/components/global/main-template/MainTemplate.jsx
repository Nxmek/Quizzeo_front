import MainContent from "../main-content/MainContent";
import NavBar from "../nav-bar/NavBar";
import mc from "./main-template.module.scss";
const MainTemplate = ({ children }) => {
  return (
    <div className="background">
      <div className={`${mc.section} container`}>
        <NavBar />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};
export default MainTemplate;
