// TODO: create a full category card carousel of images func component
// TODO: setup retrieve image functionality from static and database

import React, { useEffect } from "react";
import { withCookies } from "react-cookie";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchCategory } from "../actions/categoryAction";
import NavBarHead from "../components/globals/navbar";
import PageFooter from "../components/globals/footer";
import { Row, Col } from "react-bootstrap";
import AdsColumn from "../components/globals/ads";

// https://stackoverflow.com/questions/54843675/componentwillreceiveprops-componentdidupdate-for-react-hook

function Category(props) {
  const dispatch = useDispatch();

  const CategoryData = useSelector((state) => state.categoryReducer.categories);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  useEffect(() => {
    dispatch(fetchCategory(query.get("category")));
    return () => {};
    // eslint-disable-next-line
  }, [query.get("category")]);

  return (
    <React.Fragment>
      <NavBarHead />
      <Row>
        <AdsColumn />
        <Col sm={8}>
          <div className="container" style={{ alignItems: "center" }}>
            {CategoryData.map((post) => {
              return <h2 key={post.id}>{post.title}</h2>;
            })}
          </div>
        </Col>
        <AdsColumn />
      </Row>
      <PageFooter />
    </React.Fragment>
  );
}

export default withCookies(Category);
