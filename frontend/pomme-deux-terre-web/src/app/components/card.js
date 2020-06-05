import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import "../styles/globals/card.css"
import TextTruncate from "react-text-truncate";
import { useHistory } from "react-router-dom";
import Tags from "../components/tag"
function CardPost(props) {
  const history = useHistory();
  const [display, setDisplay] = useState(false);

  return (
    <React.Fragment>
      <Card
      className="card-post"
        style={{ width: "100%", height: "100%", borderRadius: "25px"
       }}
        key={props.post.id}
      >
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
          style={{
            height: "50%",
            borderTopRightRadius: "25px",
            borderTopLeftRadius: "25px",
            objectFit:"cover"
          }}
        />
        <Card.Body style={{ padding: "5px 20px" }}>
          <Card.Title style={{ color: "black", marginTop: "10px" }}>
            {props.post.title}
          </Card.Title>
          
          <Card.Text style={{ color: "black" }}>
            {display ? (
              <TextTruncate
                line={3}
                element="span"
                text={props.post.description}
                textTruncateChild={
                  // eslint-disable-next-line
                  <a
                    style={{ color: "blue" }}
                    onClick={() => setDisplay(false)}
                  >
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
                  <a style={{ color: "blue" }} onClick={() => setDisplay(true)}>
                    Read on
                  </a>
                }
              />
            )}
          </Card.Text>
          <div style={{display:"flex",flexDirection: "column"}}>
          <Button
            className="card-button"
            variant="primary"
            onClick={() => history.push("/posts/" + props.post.id)}
          >
            Find out more
          </Button>
          <p style={{marginBottom: "4px"}}>Posted by: {props.post.user.name}</p>
          </div>
          <div>
          {undefined !== props.post.tags &&
                    props.post.tags.length ? <Tags tags={props.post.tags} count={5}/> : null }
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

export default CardPost;
