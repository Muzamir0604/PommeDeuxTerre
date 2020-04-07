// TODO: create a full category card carousel of images func component
// TODO: setup retrieve image functionality from static and database

import React, { useEffect } from "react";
import { withCookies } from "react-cookie";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchCategory } from "../actions/categoryAction";
import NavBarHead from "../components/globals/navbar";
import PageFooter from "../components/globals/footer";
import { Row, Col, Jumbotron, Container, Card, Button } from "react-bootstrap";
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
              return (
                <Jumbotron
                  fluid
                  style={{ padding: "20px 0px", display: "flex" }}
                  key={post.id}
                >
                  <Container>
                    <Row>
                      <Col sm={8} style={{ order: 1 }}>
                        <h1 key={post.id}>{post.title}</h1>
                        <p>{post.description}</p>
                        <p>No of Reviews {post.no_of_reviews}</p>
                        <p>Average Rating: {post.avg_rating}</p>
                        <Button>Read More</Button>
                      </Col>
                      <Col
                        style={{
                          order: 2,
                          padding: "5px 5px",
                          margin: "5px 5px",
                        }}
                      >
                        <Card.Img
                          src={
                            post.post_images.length > 0
                              ? post.post_images[0].image
                              : require("../../assets/blog/castle.png")
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
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
