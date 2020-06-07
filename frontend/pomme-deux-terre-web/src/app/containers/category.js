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
import ImageCarousel from "../components/globals/oneImageCarousel";
import "../styles/container/category.css";
import Tags from "../components/tag";

// https://stackoverflow.com/questions/54843675/componentwillreceiveprops-componentdidupdate-for-react-hook
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function Category(props) {
  const dispatch = useDispatch();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  useEffect(() => {
    dispatch(fetchCategory(query.get("category")));
    sleep(2000);
    return () => {};
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(fetchCategory(query.get("category")));
    sleep(2000);
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
            {undefined !== CategoryData && CategoryData.length
              ? CategoryData.map((post) => {
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
                            <Tags tags={post.tags} count={post.tags.length} />
                            <p>Written by: {post.user.name}</p>
                          </Col>
                          <Col className="image-col" style={{ order: 2 }}>
                            {undefined !== post.post_images &&
                            post.post_images.length ? (
                              <ImageCarousel images={post.post_images} />
                            ) : (
                              <Card.Img
                                className=""
                                src={require("../../assets/blog/castle.png")}
                              />
                            )}
                          </Col>
                        </Row>
                      </Container>
                    </Jumbotron>
                  );
                })
              : null}
          </div>
        </Col>

        <AdsColumn />
      </Row>
      <PageFooter />
    </React.Fragment>
  );
}

export default withCookies(Category);
