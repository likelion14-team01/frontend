import React from "react";
import MyPlantCard from "./MyPlantCard";
import MyPlantAddCard from "./MyPlantAddCard";
import "./MyPlantCard.css";

function MyPlantCardList({ plants = [], onCardClick, onAddClick }) {
  return (
    <section className="myPlantCardSection">
      <div className="myPlantCardGrid">
        {plants.map((plant) => (
          <MyPlantCard
            key={plant.id}
            name={plant.name}
            image={plant.image}
            category={plant.category}
            dayText={plant.dayText}
            waterCycleText={plant.waterCycleText}
            nextWateringText={plant.nextWateringText}
            imageType={plant.imageType}
            onClick={() => onCardClick?.(plant.id)}
          />
        ))}

        <MyPlantAddCard onClick={onAddClick} />
      </div>
    </section>
  );
}

export default MyPlantCardList;