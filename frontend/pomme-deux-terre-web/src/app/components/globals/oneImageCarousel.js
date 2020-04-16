import React from "react";
// import CardPost from "./card";

import "../../styles/container/category.css";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Container, Image } from "react-bootstrap";

function ImageCarousel(props) {
  let renderCompoent = (
    <Carousel autoPlay>
      {props.images.map((image) => {
        return (
          <div key={image.id} style={{ height: "100%" }}>
            {console.log("image carousel consume:: ", image.image)}
            <Image src={image.image} />
          </div>
        );
      })}
    </Carousel>
  );

  return <React.Fragment> {renderCompoent}</React.Fragment>;
}
export default ImageCarousel;
