import React from "react";
import { withCookies } from "react-cookie";

import NavBarHead from "../components/globals/navbar";
import PageFooter from "../components/globals/footer";

import AdsColumn from "../components/globals/ads";

import { Row, Col, Image } from "react-bootstrap";

function About(props) {
  //   const dispatch = useDispatch();

  //   const post = useSelector((state) => state.postReducer.post);
  //   const reviews = useSelector((state) => state.reviewReducer);
  // const auth = useSelector((state) => state.authReducer);

  return (
    <React.Fragment>
      <NavBarHead />
      <Row>
        <AdsColumn />
        <Col sm={8}>
          {/* <h2>About us</h2> */}
          <Row style={{ paddingTop: "10px" }}>
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
              difficult and going green can be expensive. Fortunately, rumour
              has it wrong. Our site aims to build a community of people willing
              to share their ideas on going and eating green more often.
            </p>
          </Row>
          <Row style={{ display: "" }}>
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
              difficult and going green can be expensive. Fortunately, rumour
              has it wrong. Our site aims to build a community of people willing
              to share their ideas on going and eating green more often.
            </p>
          </Row>
        </Col>
        <AdsColumn />
      </Row>
      <PageFooter />
    </React.Fragment>
  );
}

export default withCookies(About);
