import React from 'react';
import './HomeCards.css';


const HomeCard = (props) => {

  return(
  
  <div className="card">
    <img className="card-img-top" src={props.image} alt={props.name} />
  </div>
 
)}

export default HomeCard;
