import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  ButtonFirst,
  ButtonLast,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import CardPost from "./card";

function CardCarousel(props) {
  let postSlide = (
    <React.Fragment>
      {props.posts.map((post) => {
        return (
          <Slide key={post.id} index={post.id}>
            <CardPost post={post} />
          </Slide>
        );
      })}
    </React.Fragment>
  );
  let postRender = null;
  if (props.posts) {
    postRender = postSlide;
  } else {
    postRender = <div>No slides</div>;
  }

  let renderCompoent = (
    <React.Fragment>
      <CarouselProvider
        visibleSlides={3}
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={props.posts.length}
      >
        <Slider>{postRender}</Slider>
        <hr />
        {props.posts.length > 4 ? (
          <React.Fragment>
            <ButtonFirst className="btn btn-primary">First</ButtonFirst>
            <ButtonBack className="btn btn-primary">Back</ButtonBack>
            <ButtonNext className="btn btn-primary">Next</ButtonNext>
            <ButtonLast className="btn btn-primary">Last</ButtonLast>
          </React.Fragment>
        ) : (
          <p></p>
        )}
      </CarouselProvider>
    </React.Fragment>
  );

  return <React.Fragment> {renderCompoent}</React.Fragment>;
}
export default CardCarousel;
