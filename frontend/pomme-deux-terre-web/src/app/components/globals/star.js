import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../styles/globals/star.css";

function Star(props) {
  return (
    <React.Fragment>
      {[...Array(5)].map((e, i) => {
        return (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            className={props.star > i ? "orange" : ""}
          />
        );
      })}
    </React.Fragment>
  );
}

export default Star;
