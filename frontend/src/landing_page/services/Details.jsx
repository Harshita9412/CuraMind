
import React from 'react';
import { useParams } from 'react-router-dom';  

const Details = () => {
  const { id } = useParams();  

  return (
    <div className="details">
      <h2>Details for Feature {id}</h2>
      
      <p>Here is more info about feature with ID: {id}</p>
    </div>
  );
};

export default Details;
