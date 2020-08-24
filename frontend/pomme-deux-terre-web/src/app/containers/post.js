import React, { useEffect, useState } from "react";
import { withCookies } from "react-cookie";

import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../actions/postActions";
import NavBarHead from "../components/globals/navbar";
import PageFooter from "../components/globals/footer";
import Star from "../components/globals/star";
import ImageCarousel from "../components/globals/oneImageCarousel";
import AdsColumn from "../components/globals/ads";

import {
  Row,
  Col,
  Jumbotron,
  Container,
  Card,
  Accordion,
  Button,
} from "react-bootstrap";

import ReviewCard from "../components/review";
import RecipeCard from "../components/recipe";
import Tags from "../components/tag";
import Brief from "../components/recipe/recipe-brief";
import ReviewForm from "./review-form";
import "../styles/container/post.css";

// https://stackoverflow.com/questions/54843675/componentwillreceiveprops-componentdidupdate-for-react-hook

function Post(props) {
  const dispatch = useDispatch();

  const post = useSelector((state) => state.postReducer.post);

  const reviews = useSelector((state) => state.reviewReducer);

  useEffect(() => {
    dispatch(fetchPost(props.match.params.id));
    // eslint-disable-next-line
  }, [reviews, props.match.params.id]);

  const [preptime, setpreptime] = useState(0);
  const [cooktime, setcooktime] = useState(0);
  const [serving, setserving] = useState(0);

  useEffect(() => {
    setpreptime(0);
    setcooktime(0);
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
      <div>
        <Jumbotron fluid key={post.id}>
          <Container>
            <Row className="row-post-primary">
              <Col className="recipe-info" sm={8}>
                <h1 key={post.id}>{post.title}</h1>
                <p>{post.description}</p>
                <Row>
                  <Col sm={7}>
                    <p>
                      Average Rating: <Star star={post.avg_rating} /> (
                      {post.no_of_reviews}){" "}
                    </p>
                    {post.user ? <p>Written by: {post.user.name}</p> : null}
                  </Col>
                  <Col className="recipe-detail" sm={5}>
                    {undefined !== post.post_recipes &&
                    post.post_recipes.length ? (
                      <Brief
                        cooktime={cooktime}
                        preptime={preptime}
                        serving={serving}
                      />
                    ) : null}
                  </Col>
                </Row>
                {undefined !== post.tags && post.tags.length ? (
                  <Tags tags={post.tags} count={post.tags.length} />
                ) : null}
              </Col>

              <Col className="image-card">
                {undefined !== post.post_images && post.post_images.length ? (
                  <ImageCarousel images={post.post_images} />
                ) : (
                  <Card.Img
                    className="image-card-src"
                    src={require("../../assets/blog/castle.png")}
                  />
                )}
              </Col>
            </Row>
            <Row>
              {undefined !== post.post_recipes && post.post_recipes.length ? (
                <RecipeCard recipes={post.post_recipes} />
              ) : null}
            </Row>
          </Container>
        </Jumbotron>
      </div>

      <div>
        {props.cookies.get("token") ? (
          <Accordion defaultActiveKey="1">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="primary" eventKey="0">
                  Rate Me !
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <ReviewForm reviews={reviews.data[0]} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ) : null}

        <Jumbotron fluid key={post.id}>
          {undefined !== post.post_reviews && post.post_reviews.length ? (
            <ReviewCard reviews={post.post_reviews} />
          ) : (
            <Container>
              <p>No reviews</p>
            </Container>
          )}
        </Jumbotron>
      </div>
    </React.Fragment>
  );
}

export default withCookies(Post);
