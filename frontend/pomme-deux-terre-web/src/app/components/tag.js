import React from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/styles";
/**
 * Renders Tags and allows for limiting number of tags
 * @function Tags
 * @param  {object} props {object contains Tags count and Tags}
 * @return {React} {description}
 */

const useStyles = makeStyles((theme) => ({
  tags: {
    justifyContent: "space-between",
    fontSize: "12px",
    margin: "2px",
    marginTop: "4px",
    marginBottom: "4px",
    backgroundColor: theme.page.background,
    color: theme.palette.primary.main,
  },
  container: {
    padding: "0.25em 0.25em",
  },
}));

function Tags(props) {
  const classes = useStyles();
  const count = props.count;
  return (
    <div className={classes.container}>
      {props.tags.slice(0, count).map((tag) => {
        return (
          <Chip
            color="primary"
            className={classes.tags}
            key={tag.id}
            label={tag.name}
          />
        );
      })}
    </div>
  );
}
Tags.propTypes = {
  tags: PropTypes.array.isRequired,
  count: PropTypes.number,
};

export default Tags;
