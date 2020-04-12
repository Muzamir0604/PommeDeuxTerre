import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import Instruction from "./recipe/instruction";
import Ingredient from "./recipe/ingredient";
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
                <Row className="justify-content-md-center">
                  <Col>
                    <h5>{recipe.name}</h5>
                    {/* <p>Prep Time: {recipe.prep_time}</p> */}
                  </Col>
                  {/* <Col> */}
                  {/* <p>Cook Time: {recipe.cook_time}</p> */}
                  {/* <p>Servings: {recipe.servings}</p> */}
                  {/* </Col> */}
                </Row>
                <Row>
                  <Col>
                    <Instruction instructions={recipe.recipe_instructions} />
                  </Col>
                  <Col>
                    <Ingredient ingredients={recipe.recipe_ingredients} />
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
