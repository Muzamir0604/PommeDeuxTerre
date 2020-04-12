import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container } from "react-bootstrap";
// import Star from "./globals/star";
// import { useHistory } from "react-router-dom";

function RecipeCard(props) {
  // const history = useHistory();
  return (
    <React.Fragment>
      <Container>
        <h4>Recipe</h4>
        {props.recipes.map((recipe) => {
          return (
            <Card
              key={recipe.id}
              style={{
                margin: "2px 2px",
                backgroundColor: "lightgrey",
              }}
            >
              <Container>
                <Row>
                  <Col>
                    <h2>RECIPE</h2>
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
export default RecipeCard;
