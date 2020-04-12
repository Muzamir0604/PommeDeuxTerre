import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import Star from "../components/globals/star";
// import { useHistory } from "react-router-dom";

function ReviewCard(props) {
  return (
    <React.Fragment>
      <Container>
        <h4>Review</h4>
        {props.reviews
          ? props.reviews.map((review) => {
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
                      <Col sm={6}>
                        <h5 style={{ marginTop: "4px" }}>{review.title}</h5>
                        <p style={{ fontSize: "12px" }}>{review.description}</p>
                      </Col>
                      <Col sm={6} style={{ textAlign: "right" }}>
                        <Star star={review.stars} />
                        <div style={{ fontSize: "12px" }}>
                          Posted by {review.user.username}
                        </div>
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
