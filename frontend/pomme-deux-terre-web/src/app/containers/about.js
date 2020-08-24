import React from "react";
import { withCookies } from "react-cookie";

import NavBarHead from "../components/globals/navbar";

import { Image } from "react-bootstrap";
import { Grid } from "@material-ui/core";

function About() {
  return (
    <React.Fragment>
      <NavBarHead />
      <Grid
        container
        spacing={2}
        style={{
          paddingTop: "3em",
        }}
      >
        <Grid item xs={12} style={{ paddingTop: "10px" }}>
          <h4>Our vision</h4>
          <p style={{ display: "inline", margin: "10px 2px" }}>
            <Image
              className="col-sm-3"
              style={{
                margin: "2px 2px",
                padding: "0px 10px",

                float: "left",
              }}
              src={require("../../assets/Apple.ico")}
            />
            We are just individuals who are very keen on sharing our ideas and
            thoughts on how we can contribute to keeping the world clean and
            green. There have been many rumours that eating healthy can be
            difficult and going green can be expensive. Fortunately, rumour has
            it wrong. Our site aims to build a community of people willing to
            share their ideas on going and eating green more often.
          </p>
        </Grid>
        <Grid item xs={12} style={{ display: "" }}>
          <h4>Our vision</h4>
          <p style={{ display: "inline", margin: "10px 2px" }}>
            <Image
              className="col-sm-3"
              style={{
                margin: "2px 2px",
                padding: "0px 10px",

                float: "right",
              }}
              src={require("../../assets/Apple.ico")}
            />
            We are just individuals who are very keen on sharing our ideas and
            thoughts on how we can contribute to keeping the world clean and
            green. There have been many rumours that eating healthy can be
            difficult and going green can be expensive. Fortunately, rumour has
            it wrong. Our site aims to build a community of people willing to
            share their ideas on going and eating green more often.
          </p>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withCookies(About);
