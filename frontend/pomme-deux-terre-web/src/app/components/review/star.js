import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import styles from "../../styles/blog/review-form.module.css";

const renderStar = (isFull) => {
  const icon = isFull ? faStar : regularStar;
  return <FontAwesomeIcon icon={icon} size="lg" />;
};

const Star = ({ isFull, onClick }) => (
  <span className={styles.star} onClick={onClick}>
    {renderStar(isFull)}
  </span>
);

const Stars = ({ count, handleClick }) => (
  <span className={styles.stars}>
    {[...Array(5).keys()].map((i) => (
      <Star key={i} isFull={i < count} onClick={() => handleClick(i + 1)} />
    ))}
  </span>
);

export default Stars;
