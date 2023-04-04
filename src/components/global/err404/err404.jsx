import React from "react";
import mc from "./err404.module.scss";

const Err404 = () => {
  return (
    <div className={mc.container}>
      <h2>Erreur 404</h2>
      <p>
        La page que vous cherchez n'existe pas, où vous n'avez pas les droits
        pour y accéder
      </p>
    </div>
  );
};

export default Err404;
