import React, { useEffect } from "react";
import { withCookies } from "react-cookie";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchCategory } from "../actions/categoryAction";
import NavBarHead from "../components/globals/navbar";
import PageFooter from "../components/globals/footer";
import { Row, Col, Jumbotron, Container, Card } from "react-bootstrap";
import AdsColumn from "../components/globals/ads";
import { Link } from "react-router-dom";
import Star from "../components/globals/star";
import "./category.css";

// https://stackoverflow.com/questions/54843675/componentwillreceiveprops-componentdidupdate-for-react-hook

function Category(props) {
  const dispatch = useDispatch();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  useEffect(() => {
    dispatch(fetchCategory(query.get("category")));
    return () => {};
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(fetchCategory(query.get("category")));
    return () => {};
    // eslint-disable-next-line
  }, [query.get("category")]);

  const CategoryData = useSelector((state) => state.categoryReducer.categories);
  return (
    <React.Fragment>
      <NavBarHead />
      <Row>
        <AdsColumn />
        <Col sm={8}>
          <div className="container">
            {CategoryData.map((post) => {
              return (
                <Jumbotron key={post.id} fluid>
                  <Container>
                    <Row>
                      <Col sm={8} style={{ order: 1 }}>
                        <Link key={post.id} to={"/posts/" + post.id}>
                          <h3>{post.title}</h3>
                        </Link>

                        <Star star={post.avg_rating} />
                        <p className="numReview">({post.no_of_reviews})</p>

                        <hr />
                        <p>{post.description}</p>
                      </Col>
                      <Col className="image-col">
                        <Link key={post.id} to={"/posts/" + post.id}>
                          <Card.Img
                            src={
                              post.post_images.length > 0
                                ? post.post_images[0].image
                                : require("../../assets/blog/castle.png")
                            }
                          />
                        </Link>
                      </Col>
                    </Row>
                  </Container>
                </Jumbotron>
              );
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
