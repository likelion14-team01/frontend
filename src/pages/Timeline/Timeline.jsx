import { useState } from "react";
import styled from "styled-components";

import Footer from "../../components/footer/Footer.jsx";
import TimelineCard from "./TimelineCard.jsx";

const plants = [
  {
    id: 1,
    name: "몬스테라",
    recordCount: 3,
    records: [
      { id: 1, date: "6월 14일", tag: "sprout", memo: "새 잎이 올라오기 시작했다" },
      { id: 2, date: "6월 18일", tag: "leaf", memo: "잎이 더 커졌다" },
      { id: 3, date: "6월 22일", tag: "water", memo: "물을 주고 건강하게 자랐다" },
    ],
  },
  {
    id: 2,
    name: "스투키",
    recordCount: 2,
    records: [
      { id: 4, date: "6월 15일", tag: "sprout", memo: "첫 기록을 남겼다" },
      { id: 5, date: "6월 21일", tag: "leaf", memo: "새 잎이 자랐다" },
    ],
  },
];

const PageContainer = styled.div`
  width: 100%;
  height: 990px;
  position: relative;
  background: #fbfdf9;
  overflow: hidden;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 79px);
  padding: 47px 12px 0;
`;

const PageTitle = styled.h1`
  margin: 0;
  text-align: center;
  color: #3f3f3f;
  font-size: 20px;
  font-weight: 700;
`;

const PlantTabs = styled.div`
  margin-top: 33px;
  display: flex;
  justify-content: center;
  gap: 11px;
`;

const PlantTab = styled.button`
  width: 119px;
  height: 32px;
  border-radius: 999px;
  border: 1.5px solid #78dc6e;
  background: ${({ $active }) => ($active ? "#78dc6e" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#3f3f3f")};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

const TimelineArea = styled.div`
  position: relative;
  margin-top: 40px;
  padding-left: 54px;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 22px;
  top: 12px;
  width: 2px;
  height: 632px;
  background: #78dc6e;
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const TimelineIcon = styled.div`
  position: absolute;
  left: -49px;
  top: 121px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid #78dc6e;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #78dc6e;
  font-size: 24px;
  z-index: 2;
`;

const CardWrapper = styled.div`
  width: 294px;
`;

const FooterWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const getTimelineIcon = (tag) => {
  if (tag === "leaf") return "🌿";
  if (tag === "water") return "🛡️";
  return "🌱";
};

export default function Timeline() {
  const [selectedPlantId, setSelectedPlantId] = useState(1);
  const selectedPlant = plants.find((plant) => plant.id === selectedPlantId);

  return (
    <PageContainer>
      <Content>
        <PageTitle>{selectedPlant.name}</PageTitle>

        <PlantTabs>
          {plants.map((plant) => (
            <PlantTab
              key={plant.id}
              type="button"
              $active={selectedPlantId === plant.id}
              onClick={() => setSelectedPlantId(plant.id)}
            >
              {plant.name} ({plant.recordCount})
            </PlantTab>
          ))}
        </PlantTabs>

        <TimelineArea>
          <TimelineLine />

          {selectedPlant.records.map((record) => (
            <TimelineItem key={record.id}>
              <TimelineIcon>{getTimelineIcon(record.tag)}</TimelineIcon>
              <CardWrapper>
                <TimelineCard
                  dateText={record.date}
                  memo={record.memo}
                  imageUrl={record.imageUrl}
                />
              </CardWrapper>
            </TimelineItem>
          ))}
        </TimelineArea>
      </Content>

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </PageContainer>
  );
}