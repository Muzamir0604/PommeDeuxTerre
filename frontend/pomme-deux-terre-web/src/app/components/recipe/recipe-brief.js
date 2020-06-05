import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/recipe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCalendarWeek,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
function Brief(props) {
  return (
    <React.Fragment>
      <span>
        <FontAwesomeIcon icon={faClock} />
        <p className="recipe-detail">&nbsp; Prep Time: {props.preptime} min(s)</p>
      </span>
      <br />
      <span>
        <FontAwesomeIcon icon={faCalendarWeek} />
        <p className="recipe-detail">&nbsp; Cook Time: {props.cooktime} min(s)</p>
      </span>
      <br />
      <span>
        <FontAwesomeIcon icon={faUsers} />
        <p className="recipe-detail">&nbsp; Servings: {props.serving}</p>
      </span>
    </React.Fragment>
  );
}

export default Brief;
