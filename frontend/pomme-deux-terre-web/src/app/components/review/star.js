import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "0px 0px",
    margin: "0px 0px",
  },
});

const HoverRating = ({ value }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        readOnly={true}
      />
    </div>
  );
};

export default HoverRating;
