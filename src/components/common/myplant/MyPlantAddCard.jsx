import React from "react";
import "./MyPlantCard.css";

function MyPlantAddCard({ onClick }) {
  return (
    <button type="button" className="myPlantAddCard" onClick={onClick}>
      <span className="myPlantAddIcon">+</span>
    </button>
  );
}

export default MyPlantAddCard;