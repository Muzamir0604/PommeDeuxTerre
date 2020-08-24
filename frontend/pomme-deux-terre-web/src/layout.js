import React from "react";
import { Route, Switch } from "react-router-dom";
import Category from "./app/containers/category";
import Post from "./app/containers/post";
import About from "./app/containers/about";
import PostForm from "./app/containers/post-form";
import App from "./App";
import Login from "./app/containers/login";
import UserProfile from "./app/containers/user";
import { Grid } from "@material-ui/core";
import Ads from "./app/components/globals/ads";
import Footer from "./app/components/globals/footer";
import NavBar from "./app/components/globals/navbar";

function layout() {
  return (
    <div>
      <Grid container container spacing={2}>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
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
  );
}

export default layout;
