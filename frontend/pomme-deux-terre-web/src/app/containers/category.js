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
          <div className="container" style={{ alignItems: "center" }}>
            {CategoryData.map((post) => {
              return (
                <Link key={post.id} to={"/posts/" + post.id}>
                  <Jumbotron
                    fluid
                    style={{
                      padding: "20px 0px",
                      display: "flex",
                      color: "black",
                    }}
                  >
                    <Container>
                      <Row>
                        <Col sm={8} style={{ order: 1 }}>
                          <h1>{post.title}</h1>
                          <Star star={post.avg_rating} />
                          <hr />
                          <p>{post.description}</p>
                          <Row>
                            <Col>
                              <p>No of Reviews {post.no_of_reviews}</p>
                            </Col>
                            <Col>
                              {/* <Button
                              onClick={() => history.push("/posts/" + post.id)}
                            >
                              Read More
                            </Button> */}
                            </Col>
                          </Row>
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
                </Link>
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
