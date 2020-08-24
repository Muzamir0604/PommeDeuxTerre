import React from "react";
import CardPost from "./card";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  paper: {
    margin: "0px 10px",
  },
  carousel: {
    margin: "10px 0px",
    height: "100%",
  },
});
function CardCarousel(props) {
  const classes = useStyles();
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  let renderCompoent = (
    <React.Fragment>
      <Carousel
        style={{ margin: "10px 0px", height: "200px" }}
        responsive={responsive}
        draggable
        showDots
      >
        {props.posts.map((post, key) => {
          return (
            <Paper key={key} className={classes.paper}>
              <Grid container key={post.id}>
                <CardPost
                  data={{
                    navigation: `/posts/${post.id}`,
                    title: post.title,
                    description: post.description,
                    image: post.post_images[0].image,
                    user: post.user.name,
                    updated_date: new Date(post.updated_at),
                    created_date: new Date(post.created_at),
                    tags: post.tags,
                    reviewStarsAvg: post.avg_rating,
                    reviewCount: post.no_of_reviews,
                  }}
                />
              </Grid>
            </Paper>
          );
        })}
      </Carousel>
    </React.Fragment>
  );

  return <React.Fragment> {renderCompoent}</React.Fragment>;
}
export default CardCarousel;
