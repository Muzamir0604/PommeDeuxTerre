import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import Star from "../components/globals/star";
// import { useHistory } from "react-router-dom";

function ReviewCard(props) {
  return (
    <React.Fragment>
      <Container>
        {/* {console.log("REVIEWS::::", props.reviews)} */}
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
            })
          : null}
      </Container>
    </React.Fragment>
  );
}

export default ReviewCard;
