import React, { useEffect, useState } from "react";
import { withCookies } from "react-cookie";

import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../actions/postActions";
import Star from "../components/globals/star";
import ImageCarousel from "../components/globals/oneImageCarousel";

import { Jumbotron, Container, Card, Accordion, Button } from "react-bootstrap";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ReviewCard from "../components/review";
import RecipeCard from "../components/recipe";
import Tags from "../components/tag";
import Brief from "../components/recipe/recipe-brief";
import ReviewForm from "./review-form";
import "../styles/container/post.css";

// https://stackoverflow.com/questions/54843675/componentwillreceiveprops-componentdidupdate-for-react-hook

const useStyles = makeStyles((theme) => ({
  box: {
    borderRadius: "10px",
    backgroundColor: "lightgrey;",
  },
  container: {
    margin: "1em 1em",
  },
}));
function Post(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

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
      <div>
        <Box key={post.id} className={classes.box}>
          <Grid container>
            <Grid item xs={12}>
              {/*  className="row-post-primary" */}
              <Grid container>
                <Grid item xs={12} sm={7} className={classes.container}>
                  {/* className="recipe-info" */}
                  <Typography variant="h4" key={post.id}>
                    {post.title}
                  </Typography>
                  <Typography variant="subtitle1">
                    {post.description}
                  </Typography>
                  <Grid container>
                    <Grid item xs={12} sm={6} md={7}>
                      <Typography variant="body1">
                        Average Rating: <Star star={post.avg_rating} /> (
                        {post.no_of_reviews}){" "}
                      </Typography>
                      {post.user ? (
                        <Typography variant="body1">
                          Written by: {post.user.name}
                        </Typography>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={5} md={4}>
                      {/* className="recipe-detail" */}
                      {undefined !== post.post_recipes &&
                      post.post_recipes.length ? (
                        <Brief
                          cooktime={cooktime}
                          preptime={preptime}
                          serving={serving}
                        />
                      ) : null}
                    </Grid>
                  </Grid>
                  {undefined !== post.tags && post.tags.length ? (
                    <Tags tags={post.tags} count={post.tags.length} />
                  ) : null}
                </Grid>

                <Grid itemxs={12} sm={4} className={classes.container}>
                  {undefined !== post.post_images && post.post_images.length ? (
                    <ImageCarousel images={post.post_images} />
                  ) : (
                    <Card.Img
                      className="image-card-src"
                      src={require("../../assets/blog/castle.png")}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {undefined !== post.post_recipes && post.post_recipes.length ? (
                <RecipeCard recipes={post.post_recipes} />
              ) : null}
            </Grid>
          </Grid>
        </Box>
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
