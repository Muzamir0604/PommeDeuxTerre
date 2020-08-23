import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./app/containers/login";
import UserProfile from "./app/containers/user";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store";
import Category from "./app/containers/category";
import Post from "./app/containers/post";
import About from "./app/containers/about";
import PostForm from "./app/containers/post-form";
import { ThemeProvider } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import theme from "./app/styles/theme";
import Ads from "./app/components/globals/ads";
import Footer from "./app/components/globals/footer";
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
            <div>
              <Grid container container spacing={2}>
                <Grid item xs={12} sm={2} style={{ marginTop: "3em" }}>
                  <Ads />
                </Grid>
                <Grid item xs={12} sm={8} style={{ marginTop: "3em" }}>
                  <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/login" component={Login} />

                    <Route path="/posts/:id" component={Post} />
                    <Route exact path="/forms/post" component={PostForm} />

                    <Route exact path={"/user/:id"} component={UserProfile} />
                    <Route exact path={"/category/"} component={Category} />
                    <Route exact path={"/aboutus"} component={About} />
                    {/* <Route exact path={"/edit"} component={EditLayout} /> */}
                    {/* <Route exact path={"/review"} component={ReviewForm} /> */}
                    {/* <Route path={"/"} component={Root}>
              <IndexRoute component={Home} />
              <Route path{"home"} component={Home}/>
              <Route path{"user/:id"} component={User}/>
              // to access ID, go to component file, call this.props.params.id
        </Route> */}
                  </Switch>
                </Grid>
                <Grid item xs={12} sm={2} style={{ marginTop: "3em" }}>
                  <Ads />
                </Grid>
                <Grid item xs={12}>
                  <Footer />
                </Grid>
              </Grid>
            </div>
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
