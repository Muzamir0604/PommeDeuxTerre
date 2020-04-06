import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";

function CardPost(props) {
  return (
    <React.Fragment>
      <Card style={{ width: "18rem", height: "100%" }}>
        <Card.Img
          variant="top"
          src={
            props.post.post_images.length > 0
              ? props.post.post_images[0].image
              : require("../../assets/blog/castle.png")
          }
          style={{ height: "40%" }}
        />
        <Card.Body>
          <Card.Title style={{ color: "black" }}>{props.post.title}</Card.Title>
          <Card.Text style={{ color: "black" }}>
            {props.post.description}
          </Card.Text>
          <Button variant="primary">Read More</Button>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

export default CardPost;
