import React from "react";
import CardPost from "./card";

import "./post-carousel.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container } from "react-bootstrap";

function CardCarousel(props) {
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
        {props.posts.map((post) => {
          return (
            <Container key={post.id} style={{ height:"400px"}}>
              <CardPost post={post} />
            </Container>
          );
        })}
      </Carousel>
    </React.Fragment>
  );

  return <React.Fragment> {renderCompoent}</React.Fragment>;
}
export default CardCarousel;
