import React from "react";
import { withCookies } from "react-cookie";
import Overview from "./app/containers/overview";

import "./App.css";
function App() {
  return (
    <React.Fragment>
      <Overview />
    </React.Fragment>
  );
}

export default withCookies(App);
