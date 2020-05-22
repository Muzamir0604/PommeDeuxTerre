import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

class AdsColumn extends Component {
  render() {
    const text = "";
    return (
      <Col style={{ margin: "5px 5px" }}>
        <Row className="App" sm={2}>
          {text}
        </Row>
        <Row className="App" sm={2}>
          {text}
        </Row>
        <Row className="App" sm={2}>
          {text}
        </Row>
        <Row className="App" sm={2}>
          {text}
        </Row>
        <Row className="App" sm={2}>
          {text}
        </Row>
        <Row className="App" sm={2}>
          {text}
        </Row>
        <Row className="App" sm={2}>
          {text}
        </Row>
      </Col>
    );
  }
}
export default AdsColumn;
