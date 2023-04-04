import mc from "./main-content.module.scss";
const MainContent = ({ children }) => {
  return <div className={mc.container}>{children}</div>;
};
export default MainContent;
