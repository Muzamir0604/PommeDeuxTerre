import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";

function CardPost(props) {
  return (
    <React.Fragment>
      <Card style={{ width: "18rem", height: "100%" }}>
        <Card.Img variant="top" src={require("../../assets/blog/castle.png")} />
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
