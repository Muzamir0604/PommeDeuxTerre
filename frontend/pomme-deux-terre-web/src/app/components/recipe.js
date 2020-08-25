import React from "react";
import Instruction from "./recipe/instruction";
import Ingredient from "./recipe/ingredient";
import { Paper, Grid, Card, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    margin: "1em",
  },
  container: {
    padding: "2em 2em",
  },
  recipeContainer: {
    padding: "1em 2em 1em",
  },
}));
function RecipeCard(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Typography variant="h4">Recipe</Typography>
          <Divider />
        </Grid>
        {props.recipes.map((recipe) => {
          return (
            <React.Fragment>
              <Grid
                container
                key={recipe.id}
                className={classes.recipeContainer}
                spacing={1}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    style={{ textDecoration: "underline" }}
                  >
                    {recipe.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Instruction instructions={recipe.recipe_instructions} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Ingredient ingredients={recipe.recipe_ingredients} />
                </Grid>
              </Grid>
              <Divider />
            </React.Fragment>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}
export default RecipeCard;
