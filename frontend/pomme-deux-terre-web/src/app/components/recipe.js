import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import Instruction from "./recipe/instruction";
import Ingredient from "./recipe/ingredient";
import "../styles/recipe.css";

function RecipeCard(props) {
  // const history = useHistory();
  return (
    <React.Fragment>
      <Container>
        <h4>Recipe</h4>

        {props.recipes.map((recipe) => {
          return (
            <Card key={recipe.id} className="recipe-card">
              <Container>
                <Row className="justify-content-md-center">
                  <Col>
                    <hr />
                    <h5>{recipe.name}</h5>
                    <hr />
                  </Col>
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
