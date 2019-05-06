import React from "react";
import "./HomeCards.css";

const HomeCard = ({ image, name }) => {
  return (
    <div className="card img-card bg-dark border-light">
      <img className="card-img-top image" src={image} alt={name} />
    </div>
  );
};

export default HomeCard;
