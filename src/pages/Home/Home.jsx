import React from "react";
import { useNavigate } from "react-router-dom";

import MainHeader from "../../components/header/MainHeader";
import MyPlantCardList from "../../components/common/myplant/MyPlantCardList";
import TopSection from "../TopSection/TopSection.jsx";

import scindapsus from "../../assets/images/scindapsus.svg";
import lavendar from "../../assets/images/lavendar.svg";
import monstera from "../../assets/images/monstera.svg";

function Home() {
  const navigate = useNavigate();

  const plants = [
    {
      id: 1,
      name: "몬스테라",
      image: monstera,
      category: "관엽식물",
      dayText: "22일째",
      waterCycleText: "7일마다",
      nextWateringText: "3일후 물주기",
    },
    {
      id: 2,
      name: "스킨답서스",
      image: scindapsus,
      category: "관엽식물",
      dayText: "10일째",
      waterCycleText: "7일마다",
      nextWateringText: "3일후 물주기",
    },
    {
      id: 3,
      name: "라벤더",
      image: lavendar,
      category: "허브",
      dayText: "5일째",
      waterCycleText: "5일마다",
      nextWateringText: "1일후 물주기",
    },
  ];

  const handleCardClick = (plantId) => {
    console.log("식물 카드 클릭:", plantId);
  };

  const handleAddClick = () => {
    navigate("/register");
  };

  return (
    <div>
      <MainHeader title="홈" />
      <TopSection />
      <MyPlantCardList
        plants={plants}
        onCardClick={handleCardClick}
        onAddClick={handleAddClick}
      />
    </div>
  );
}

export default Home;