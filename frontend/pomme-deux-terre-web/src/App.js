import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { withCookies } from "react-cookie";
import Overview from "./app/containers/overview";
import NavBarHead from "./app/components/globals/navbar";
import PageFooter from "./app/components/globals/footer";
import AdsColumn from "./app/components/globals/ads";
import { Col, Row } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBarHead />
        <Row>
          <AdsColumn />
          <Col sm={8}>
            <Overview />
          </Col>
          <AdsColumn />
        </Row>
        <PageFooter />
      </React.Fragment>
    );
  }
}

export default withCookies(App);
