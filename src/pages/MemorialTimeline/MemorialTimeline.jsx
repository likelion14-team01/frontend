import styled from "styled-components";

import Footer from "../../components/footer/Footer.jsx";
import TimelineCard from "../Timeline/TimelineCard";

const plants = [
  {
    id: 1,
    name: "몬스테라",
    totalCount: 3,
    recordCount: 2,
    active: false,
  },
  {
    id: 2,
    name: "스투키",
    totalCount: 2,
    recordCount: 2,
    active: true,
  },
];

const timelineRecords = [
  {
    id: 1,
    date: "6월 14일",
    tag: "sprout",
    content: "새 잎이 올라오기 시작했다",
  },
  {
    id: 2,
    date: "6월 14일",
    tag: "leaf",
    content: "새 잎이 올라오기 시작했다",
  },
  {
    id: 3,
    date: "6월 14일",
    tag: "farewell",
    content: "작별의 순간....",
  },
];

const PageContainer = styled.div`
  width: 402px;
  height: 1280px;
  position: relative;
  background: #F6F9F5;
  overflow: hidden;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 79px);
  padding: 34px 30px 0;
`;

const PageTitle = styled.h1`
    color: #3F3F3F;
    font-size: 20px;
    font-family: Pretendard Variable;
    font-weight: 600;
    text-align: center;
`;

const PlantTabs = styled.div`
  margin-top: 31px;
  display: flex;
  gap: 10px;
`;

const PlantTab = styled.button`
  min-width: 105px;
  height: 32px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1.5px solid #78dc6e;
  background: ${({ $active }) => ($active ? "#78dc6e" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#3f3f3f")};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
`;

const MemorialInfo = styled.section`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemorialIcon = styled.div`
  width: 96px;
  height: 96px;
  color: #a8a8a8;
  font-size: 78px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlantName = styled.h2`
  margin: 16px 0 6px;
  color: #3f3f3f;
  font-size: 20px;
  font-weight: 700;
`;

const PeriodText = styled.p`
  margin: 0 0 12px;
  color: #3f3f3f;
  font-size: 14px;
  font-family: Pretendard Variable;
  font-weight: 500;
`;

const DateRange = styled.p`
  margin: 0;
  color: #3f3f3f;
  font-size: 14px;
  font-family: Pretendard Variable;
  font-weight: 500;
`;

const Divider = styled.div`
  width: 342px;
  height: 1px;
  margin: 25px auto 0;
  background: #dedede;
`;

const IntroText = styled.p`
    color: #3F3F3F;
    font-size: 14px;
    font-family: Pretendard Variable;
    font-weight: 500;
    text-align: center;
`;

const TimelineArea = styled.div`
  position: relative;
  margin-top: 29px;
  padding-left: 39px;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 0;
  top: 8px;
  width: 2px;
  height: 620px;
  background: #78dc6e;
`;

const TimelineItem = styled.article`
  position: relative;
  width: 294px;
  height: 216px;
  margin-bottom: 14px;
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
`;

const TimelineIcon = styled.div`
  position: absolute;
  left: -57px;
  top: ${({ $index }) => ($index === 2 ? "97px" : "86px")};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid ${({ $farewell }) => ($farewell ? "#a8a8a8" : "#78dc6e")};
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $farewell }) => ($farewell ? "#a8a8a8" : "#78dc6e")};
  font-size: 22px;
  z-index: 2;
`;

const CardImageArea = styled.div`
  height: 154px;
  position: relative;
  background: #f1f1f1;
`;

const DateBadge = styled.span`
  position: absolute;
  left: 14px;
  top: 11px;
  height: 22px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.55);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const CardContent = styled.div`
  height: 62px;
  padding: 20px 16px;
  color: #3f3f3f;
  font-size: 15px;
  font-weight: 500;
`;

const FooterWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const getTimelineIcon = (tag) => {
  if (tag === "farewell") return "🪦";
  if (tag === "leaf") return "🌿";
  return "🌱";
};

export default function MemorialTimeline() {
  const activePlant = plants.find((plant) => plant.active);

  return (
    <PageContainer>
      <Content>
        <PageTitle>{activePlant.name}</PageTitle>

        <PlantTabs>
          {plants.map((plant) => (
            <PlantTab key={plant.id} $active={plant.active}>
              {plant.name} ({plant.recordCount})
            </PlantTab>
          ))}
        </PlantTabs>

        <MemorialInfo>
          <MemorialIcon>🪦</MemorialIcon>
          <PlantName>{activePlant.name}</PlantName>
          <PeriodText>37일간 함께했어요</PeriodText>
          <DateRange>2026.05.04 ~ 2026.07.04</DateRange>
        </MemorialInfo>

        <Divider />

        <IntroText>{activePlant.name}와 함께한 소중한 시간을 추억해보세요</IntroText>

        <TimelineArea>
          <TimelineLine />
          {timelineRecords.map((record, index) => (
  <div
    key={record.id}
    style={{
      position: "relative",
      marginBottom: "14px",
    }}
  >
    <TimelineIcon
      $index={index}
      $farewell={record.tag === "farewell"}
    >
      {getTimelineIcon(record.tag)}
    </TimelineIcon>

    <TimelineCard
      imageUrl={record.imageUrl}
      dateText={record.date}
      memo={record.content}
    />
  </div>
))}
        </TimelineArea>
      </Content>

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </PageContainer>
  );
}