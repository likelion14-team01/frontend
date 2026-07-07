import React from "react";
import "./MyPlantCard.css";

function MyPlantCard({
  name,
  image,
  category,
  dayText,
  waterCycleText,
  nextWateringText,
  onClick,
}) {
  return (
    <article className="myPlantCard" onClick={onClick}>
      {nextWateringText && (
        <span className="myPlantBadge">{nextWateringText}</span>
      )}

      <div className="myPlantImageBox">
        {image ? (
          <img src={image} alt={name} className="myPlantImage" />
        ) : (
          <div className="myPlantImagePlaceholder">🌱</div>
        )}
      </div>

      <div className="myPlantInfo">
        <div className="myPlantTextArea">
          <h3 className="myPlantName">{name}</h3>

          <p className="myPlantSubText">
            <span>{dayText}</span>
            <span className="myPlantDot">·</span>
            <span className="myPlantWaterIcon">💧</span>
            <span>{waterCycleText}</span>
          </p>
        </div>

        <span className="myPlantCategory">{category}</span>
      </div>
    </article>
  );
}

export default MyPlantCard;