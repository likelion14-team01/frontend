import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import MainHeader from "../../components/header/MainHeader";
import MyPlantCardList from "../../components/common/myplant/MyPlantCardList";
import TopSection from "../TopSection/TopSection.jsx";
import { getPlants } from "../../api/plantApi";

const HomeContainer = styled.div`
  height: 1004px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const getImageUrl = (url) => {
  if (!url) return "";

  if (url.startsWith("http")) {
    return url;
  }

  return `${import.meta.env.VITE_API_URL}${url}`;
};

function Home() {
  const navigate = useNavigate();


  const handleCardClick = (plantId) => {
  navigate(`/record/${plantId}`);
};

  const handleAddClick = () => {
    navigate("/register");
  };

  const [plants, setPlants] = useState([]);

useEffect(() => {
  const fetchPlants = async () => {
    try {
      const data = await getPlants();
      setPlants(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("식물 목록 조회 실패:", error);
    }
  };

  fetchPlants();
}, []);

const plantCards = (plants ?? []).map((plant) => ({
  id: plant.plantId,
  name: plant.nickname,
  path: `/record/${plant.plantId}`,
  image: getImageUrl(plant.photoUrl || plant.speciesImageUrl),
  category: plant.category,
  dayText: plant.dayText,
  waterCycleText: plant.waterCycleText,
  nextWateringText: plant.nextWateringText,
}));

  return (
    <HomeContainer>
      <MainHeader title="홈" />
      <TopSection />
      <MyPlantCardList
      plants={plantCards}
      onCardClick={handleCardClick}
      onAddClick={handleAddClick}
      />
    </HomeContainer>
  );
}

export default Home;