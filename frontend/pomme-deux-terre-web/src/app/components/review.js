import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import Star from "../components/globals/star";
import "../styles/review.css";


function ReviewCard(props) {
  return (
    <React.Fragment>
      <Container>
        <h4>Review</h4>
        {props.reviews
          ? props.reviews.map((review) => {
              return (
                <Card className="review-card" key={review.id}>
                  <Container>
                    <Row>
                      <Col sm={6}>
                        <h5>{review.title}</h5>
                        <p>{review.description}</p>
                      </Col>
                      <Col sm={6} style={{ textAlign: "right" }}>
                        <Star star={review.stars} />
                        <div>Posted by {review.user.name}</div>
                      </Col>
                    </Row>
                  </Container>
                </Card>
              );
            })
          : null}
      </Container>
    </React.Fragment>
  );
}

export default ReviewCard;
