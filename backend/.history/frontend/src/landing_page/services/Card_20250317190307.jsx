import React from "react";
import PropTypes from 'prop-types';
import "./Card.css";

const Card = ({ image, title, onClick }) => (
  <div className="card" onClick={onClick}>
    {image ? (
      <img src={image} alt={title} />
    ) : (
      <div className="image-placeholder">Image not available</div>
    )}
    <h3>{title || 'Untitled'}</h3>
  </div>
);

Card.propTypes = {
  image: PropTypes.string,  // Optional for improved flexibility
  title: PropTypes.string,  
  onClick: PropTypes.func.isRequired
};

export default Card;
