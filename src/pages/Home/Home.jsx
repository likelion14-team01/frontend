import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import MainHeader from "../../components/header/MainHeader";
import MyPlantCardList from "../../components/common/myplant/MyPlantCardList";
import TopSection from "../TopSection/TopSection.jsx";

import scindapsus from "../../assets/images/scindapsus.svg";
import lavendar from "../../assets/images/lavendar.svg";
import monstera from "../../assets/images/monstera.svg";

const HomeContainer = styled.div`
    height: 1004px;
`;

function Home() {
  const navigate = useNavigate();

  const plants = [
    {
      id: 1,
      name: "몬스테라",
      path: "/record/monstera",
      image: monstera,
      category: "관엽식물",
      dayText: "22일째",
      waterCycleText: "7일마다",
      nextWateringText: "3일후 물주기",
    },
    {
      id: 2,
      name: "스킨답서스",
      path: "/record/scindapsus",
      image: scindapsus,
      category: "관엽식물",
      dayText: "10일째",
      waterCycleText: "7일마다",
      nextWateringText: "3일후 물주기",
    },
    {
      id: 3,
      name: "라벤더",
      path: "/record/lavender",
      image: lavendar,
      category: "허브",
      dayText: "5일째",
      waterCycleText: "5일마다",
      nextWateringText: "1일후 물주기",
    },
  ];

  const handleCardClick = (plantId) => {
    const selectedPlant = plants.find((plant) => plant.id === plantId);

    if (selectedPlant) {
      navigate(selectedPlant.path);
    }
  };

  const handleAddClick = () => {
    navigate("/register");
  };

  return (
    <HomeContainer>
      <MainHeader title="홈" />
      <TopSection />
      <MyPlantCardList
        plants={plants}
        onCardClick={handleCardClick}
        onAddClick={handleAddClick}
      />
    </HomeContainer>
  );
}

export default Home;