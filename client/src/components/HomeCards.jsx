import React from "react";
import "./HomeCards.css";

const HomeCard = props => {
  return (
    <div className="card img-card bg-dark border-light">
      <img className="card-img-top image" src={props.image} alt={props.name} />
    </div>
  );
};

export default HomeCard;
