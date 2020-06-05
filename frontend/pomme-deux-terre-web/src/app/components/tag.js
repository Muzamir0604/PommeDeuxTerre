import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge } from "react-bootstrap";
import PropTypes from "prop-types"
/**
 * Renders Tags and allows for limiting number of tags
 * @function Tags
 * @param  {object} props {object contains Tags count and Tags}
 * @return {React} {description}
 */
function Tags(props) {
  const count= props.count
  return (
    <div data-test="component-tags">
      {props.tags.slice(0, count).map((tag) => {
        return (
          <Badge data-test="component-badge-tags" style={{justifyContent: "space-between",
        fontSize:"12px",margin:"2px", marginTop:"4px", marginBottom:"4px"}} variant="info" key={tag.id}>
            {tag.name}
          </Badge>
        );
      })}
    </div>
  );
}
Tags.propTypes = {
        tags: PropTypes.array.isRequired,
        count:PropTypes.number
};

export default Tags;
