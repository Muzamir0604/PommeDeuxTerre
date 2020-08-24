import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./app/styles/theme";
import Layout from "./layout";
// import EditLayout from "./app/containers/edit";
// import ReviewForm from "./app/containers/review-form";

// dont forget to install react-router-dom
// and react-cookie
// https://stackoverflow.com/questions/32616844/git-how-to-push-a-subdirectory-to-a-separate-branch-of-the-same-repository

const routing = (
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <Layout />
          </ThemeProvider>
        </CookiesProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
