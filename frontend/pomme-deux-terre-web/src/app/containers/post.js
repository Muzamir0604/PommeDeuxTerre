import React, { useEffect, useState } from "react";
import { withCookies } from "react-cookie";

import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../actions/postActions";
import NavBarHead from "../components/globals/navbar";
import PageFooter from "../components/globals/footer";
import Star from "../components/globals/star";
import { Row, Col, Jumbotron, Container, Card } from "react-bootstrap";
import AdsColumn from "../components/globals/ads";
import ReviewCard from "../components/review";
import RecipeCard from "../components/recipe";

// https://stackoverflow.com/questions/54843675/componentwillreceiveprops-componentdidupdate-for-react-hook

function Post(props) {
  const dispatch = useDispatch();

  const post = useSelector((state) => state.postReducer.post);

  useEffect(() => {
    dispatch(fetchPost(props.match.params.id));

    // eslint-disable-next-line
  }, []);
  const [preptime, setpreptime] = useState(0);
  const [cooktime, setcooktime] = useState(0);
  const [serving, setserving] = useState(0);

  useEffect(() => {
    if (undefined !== post.post_recipes && post.post_recipes.length > 0) {
      post.post_recipes.map((recipe) => {
        setpreptime((preptime) => preptime + recipe.prep_time);
        setcooktime((cooktime) => cooktime + recipe.cook_time);
        setserving(recipe.servings);
        return null;
      });
    }
  }, [post.post_recipes]);

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
                    <Row>
                      <Col>
                        <p>
                          Average Rating: <Star star={post.avg_rating} /> (
                          {post.no_of_reviews}){" "}
                        </p>
                      </Col>
                      <Col>
                        {undefined !== post.post_recipes &&
                        post.post_recipes.length &&
                        undefined !== post.post_recipes &&
                        post.post_recipes.length ? (
                          <React.Fragment>
                            <p
                              style={{ margin: "0px 0px", padding: "0px 0px" }}
                            >
                              Prep Time: {preptime}
                            </p>
                            <p
                              style={{ margin: "0px 0px", padding: "0px 0px" }}
                            >
                              Cook Time: {cooktime}
                            </p>
                            <p
                              style={{ margin: "0px 0px", padding: "0px 0px" }}
                            >
                              Servings: {serving}
                            </p>
                          </React.Fragment>
                        ) : null}
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
                    {/* {console.log(post)} */}
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
                <Row>
                  {undefined !== post.post_recipes &&
                  post.post_recipes.length ? (
                    <RecipeCard recipes={post.post_recipes} />
                  ) : null}
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
              {undefined !== post.post_reviews && post.post_reviews.length ? (
                <ReviewCard reviews={post.post_reviews} />
              ) : (
                <Container>
                  <p>No reviews</p>
                </Container>
              )}
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
