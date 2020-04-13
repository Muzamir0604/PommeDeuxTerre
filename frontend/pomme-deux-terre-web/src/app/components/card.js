import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";

import TextTruncate from "react-text-truncate";
import { useHistory } from "react-router-dom";

function CardPost(props) {
  const history = useHistory();
  const [display, setDisplay] = useState(false);

  return (
    <React.Fragment>
      <Card style={{ width: "100%", height: "100%" }} key={props.post.id}>
        <Card.Img
          onClick={() => {
            history.push("/posts/" + props.post.id);
          }}
          variant="top"
          src={
            props.post.post_images.length > 0
              ? props.post.post_images[0].image
              : require("../../assets/blog/castle.png")
          }
          style={{ height: "40%" }}
        />
        <Card.Body style={{ padding: "5px 20px" }}>
          <Card.Title style={{ color: "black" }}>{props.post.title}</Card.Title>
          <Card.Text style={{ color: "black" }}>
            {display ? (
              <TextTruncate
                line={3}
                element="span"
                text={props.post.description}
                textTruncateChild={
                  // eslint-disable-next-line
                  <a href="#" onClick={() => setDisplay(false)}>
                    Collapse
                  </a>
                }
              />
            ) : (
              <TextTruncate
                line={2}
                element="span"
                text={props.post.description}
                textTruncateChild={
                  // eslint-disable-next-line
                  <a href="#" onClick={() => setDisplay(true)}>
                    Read on
                  </a>
                }
              />
            )}
          </Card.Text>
          <Button
            style={{ display: "flex", justifyContent: "flex-end" }}
            variant="primary"
            onClick={() => history.push("/posts/" + props.post.id)}
          >
            Find out more
          </Button>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

export default CardPost;
