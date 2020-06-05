import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/recipe.css";

function Ingredient(props) {
  return (
    <React.Fragment>

      <h5>Ingredients</h5>
      <ol style={{paddingLeft: "1em"}}>
        {props.ingredients.map((ingredient) => {
          return (
            <li key={ingredient.id}>
              {ingredient.name} - {ingredient.quantity} {ingredient.unit}
            </li>
          );
        })}
      </ol>

      </React.Fragment>
  );
}

export default Ingredient;
