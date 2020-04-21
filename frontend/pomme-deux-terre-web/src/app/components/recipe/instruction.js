import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/recipe.css";
function Instruction(props) {
  return (
    <React.Fragment>
      <h5>Instructions</h5>
      <ol>
        {props.instructions.map((instruction) => {
          return <li key={instruction.id}>{instruction.title}</li>;
        })}
      </ol>
    </React.Fragment>
  );
}

export default Instruction;
