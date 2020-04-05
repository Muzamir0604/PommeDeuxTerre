import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { withCookies } from "react-cookie";
import Overview from "./app/containers/overview";
import NavBarHead from "./app/components/globals/navbar";
import PageFooter from "./app/components/globals/footer";
import AdsColumn from "./app/components/globals/ads";
import { Col, Row } from "react-bootstrap";
import { getPostList } from "./app/api/post";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "./app/actions/postActions";
import { fetchShortList } from "./app/actions/categoryAction";

function App(props) {
  const dispatch = useDispatch();

  const post = useSelector((state) => state.postReducer.post);
  const auth = useSelector((state) => state.authReducer);
  const CatshortList = useSelector((state) => state.categoryReducer.shortList);
  const listing = (post) => {
    dispatch(setPost(post));
  };

  useEffect(() => {
    if (auth.token) {
      getPostList().then((response) => {
        listing(response.data);
      });
      dispatch(fetchShortList());
    }
    getPostList();
    fetchShortList(); // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <NavBarHead />
      <Row>
        <AdsColumn />
        <Col sm={8}>
          <Overview post={post} shortList={CatshortList} />
        </Col>
        <AdsColumn />
      </Row>
      <PageFooter />
    </React.Fragment>
  );
}

export default withCookies(App);
