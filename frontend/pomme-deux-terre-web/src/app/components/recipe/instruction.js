import React from "react";
import { Typography } from "@material-ui/core";

//TODO: increase size of ordered list number
// https://stackoverflow.com/questions/7990429/how-to-control-size-of-list-style-type-disc-in-css
function Instruction(props) {
  return (
    <React.Fragment>
      <Typography variant="h5">Instructions</Typography>
      <ol style={{ paddingLeft: "1em" }}>
        {props.instructions.map((instruction) => {
          return (
            <li key={instruction.id}>
              <Typography variant="body1">{instruction.title}</Typography>
            </li>
          );
        })}
      </ol>
    </React.Fragment>
  );
}

export default Instruction;
