import React, { useEffect } from "react";
import { withCookies } from "react-cookie";

import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../actions/postActions";
import NavBarHead from "../components/globals/navbar";
import PageFooter from "../components/globals/footer";
import Star from "../components/globals/star";
import { Row, Col, Jumbotron, Container, Card } from "react-bootstrap";
import AdsColumn from "../components/globals/ads";

// https://stackoverflow.com/questions/54843675/componentwillreceiveprops-componentdidupdate-for-react-hook

function Post(props) {
  const dispatch = useDispatch();

  const post = useSelector((state) => state.postReducer.post);

  useEffect(() => {
    dispatch(fetchPost(props.match.params.id));

    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <NavBarHead />
      <Row>
        <AdsColumn />
        <Col sm={8}>
          <div>
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
                    <p>No of Reviews: {post.no_of_reviews}</p>
                    <Star star={post.avg_rating} />
                  </Col>
                  <Col
                    style={{
                      order: 2,
                      padding: "5px 5px",
                      margin: "5px 5px",
                    }}
                  >
                    {console.log(post)}
                    <Card.Img
                      src={
                        undefined !== post.post_images &&
                        post.post_images.length
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
          </div>
          <div>
            <Jumbotron
              fluid
              style={{ padding: "20px 0px", display: "flex" }}
              key={post.id}
            >
              <Container>
                <h4>Reviews</h4>
                {undefined !== post.post_reviews && post.post_reviews.length
                  ? post.post_reviews.map((review) => {
                      return (
                        <Card
                          key={review.id}
                          style={{
                            margin: "2px 2px",
                            backgroundColor: "lightgrey",
                          }}
                        >
                          <Container>
                            <Row>
                              <Col>
                                <h5>{review.title}</h5>
                                <p>{review.description}</p>
                              </Col>
                              <Col>
                                <Star star={review.stars} />
                                <pre> Posted by {review.user.username}</pre>
                              </Col>
                            </Row>
                          </Container>
                        </Card>
                      );
                    })
                  : null}
              </Container>
            </Jumbotron>
          </div>
        </Col>
        <AdsColumn />
      </Row>
      <PageFooter />
    </React.Fragment>
  );
}

export default withCookies(Post);
