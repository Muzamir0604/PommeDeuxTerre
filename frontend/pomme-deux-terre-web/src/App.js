import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { withCookies } from "react-cookie";
import Overview from "./app/containers/overview";
import NavBarHead from "./app/components/globals/navbar";
import PageFooter from "./app/components/globals/footer";
import AdsColumn from "./app/components/globals/ads";
import { Col, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { setPost } from "./app/actions/postActions";
import { fetchShortList } from "./app/actions/categoryAction";
import "./App.css";
function App(props) {
  const dispatch = useDispatch();

  const post = useSelector((state) => state.postReducer.post);
  useEffect(() => {
    dispatch(fetchShortList());
    // eslint-disable-next-line
  }, []);
  const CatshortList = useSelector((state) => state.categoryReducer.shortList);
  // eslint-disable-next-line
  const listing = (post) => {
    dispatch(setPost(post));
  };

  return (
    <React.Fragment>
      <NavBarHead />
      <Row>
        <AdsColumn />
        <Col sm={8}>
          {CatshortList ? (
            <Overview post={post} shortList={CatshortList} />
          ) : null}
        </Col>
        <AdsColumn />
      </Row>
      <PageFooter />
    </React.Fragment>
  );
}

export default withCookies(App);
