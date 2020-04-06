import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./app/containers/login";
import UserProfile from "./app/containers/user";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store";
import Category from "./app/containers/category";

// dont forget to install react-router-dom
// and react-cookie

const routing = (
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CookiesProvider>
          <Route exact path="/" component={Login} />
          <Route exact path="/posts" component={App} />
          <Route exact path={"/user/:id"} component={UserProfile} />
          <Route exact path={"/category"} component={Category} />
          {/* <Route path={"/"} component={Root}>
              <IndexRoute component={Home} />
              <Route path{"home"} component={Home}/>
              <Route path{"user/:id"} component={User}/>
              // to access ID, go to component file, call this.props.params.id
        </Route> */}
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
