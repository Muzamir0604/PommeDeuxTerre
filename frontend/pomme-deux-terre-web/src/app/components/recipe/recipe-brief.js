import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../styles/recipe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-ui/core";
import {
  faClock,
  faCalendarWeek,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
function Brief(props) {
  return (
    <React.Fragment>
      <span style={{ whiteSpace: "nowrap" }}>
        <FontAwesomeIcon icon={faClock} className="fa-2x" />
        <Typography noWrap variant="body1" className="recipe-detail">
          &nbsp; Prep Time: {props.preptime} min(s)
        </Typography>
      </span>
      <br />
      <span style={{ whiteSpace: "nowrap" }}>
        <FontAwesomeIcon icon={faCalendarWeek} className="fa-2x" />
        <Typography noWrap variant="body1" className="recipe-detail">
          &nbsp; Cook Time: {props.cooktime} min(s)
        </Typography>
      </span>
      <br />
      <span style={{ whiteSpace: "nowrap" }}>
        <FontAwesomeIcon icon={faUsers} className="fa-lg" />
        <Typography noWrap variant="body1" className="recipe-detail">
          &nbsp; Servings: {props.serving}
        </Typography>
      </span>
    </React.Fragment>
  );
}

export default Brief;
