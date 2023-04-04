import React from "react";
import ReactDOM from "react-dom/client";
import "./Style/index.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app/Apps";

/* Mise en place redux */
import { Provider } from "react-redux";
import reducers from "./redux/reducers";
import sizeMiddleware from "./redux/middlewares/size-middleware";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";

const middlewares = applyMiddleware(thunk, sizeMiddleware);

// LIEN AVEC L'EXTENSION REDUX DEVTOOLS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(middlewares));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
