import React from "react";
import PropTypes from 'prop-types'; // Add this import
import "./Card.css";

const Card = ({ image, title, onClick }) => (
  <div className="card" onClick={onClick}>
    <img src={image} alt={title} />
    <h3>{title}</h3>
  </div>
);

Card.propTypes = {
  image: PropTypes.string.isRequired,  // Ensures image is a string
  title: PropTypes.string.isRequired,  // Ensures title is a string
  onClick: PropTypes.func.isRequired,  // Ensures onClick is a function
};

export default Card;
