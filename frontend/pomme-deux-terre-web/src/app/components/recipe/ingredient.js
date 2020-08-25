import React from "react";
import { Typography } from "@material-ui/core";

//TODO: increase size of ordered list number
function Ingredient(props) {
  return (
    <React.Fragment>
      <Typography variant="h5">Ingredients</Typography>
      <ol style={{ paddingLeft: "1em" }}>
        {props.ingredients.map((ingredient) => {
          return (
            <li key={ingredient.id}>
              <Typography variant="body1">
                {ingredient.name} - {ingredient.quantity} {ingredient.unit}
              </Typography>
            </li>
          );
        })}
      </ol>
    </React.Fragment>
  );
}

export default Ingredient;
