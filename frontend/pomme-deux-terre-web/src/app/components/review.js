import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import Star from "../components/globals/star";
import { useHistory } from "react-router-dom";

function ReviewCard(props) {
  const history = useHistory();
  return (
    <React.Fragment>
      {/* <h1>HELLO</h1> */}
      <Container>
        <h4>Reviews</h4>
        {props.reviews.map((review) => {
          return (
            <Card
              key={review.id}
              style={{
                margin: "2px 2px",
                backgroundColor: "lightgrey",
              }}
            >
              <Container>
                <Row>
                  <Col>
                    <h5>{review.title}</h5>
                    <p>{review.description}</p>
                  </Col>
                  <Col>
                    <Star star={review.stars} />
                    <pre> Posted by {review.user.username}</pre>
                  </Col>
                </Row>
              </Container>
            </Card>
          );
        })}
      </Container>
    </React.Fragment>
  );
}

export default ReviewCard;
