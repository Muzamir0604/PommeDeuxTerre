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
          <h2>About us</h2>
          <Image src={require("../../assets/Apple.ico")}></Image>
        </Col>
        <AdsColumn />
      </Row>
      <PageFooter />
    </React.Fragment>
  );
}

export default withCookies(About);
