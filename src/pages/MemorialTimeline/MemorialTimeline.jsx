import { useEffect, useState } from "react";
import styled from "styled-components";

import TimelineCard from "../Timeline/TimelineCard";
import { getPlants } from "../../api/plantApi.js";
import { getTimeline } from "../../api/timelineApi.js";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #f6f9f5;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Content = styled.div`
  width: 100%;
  padding: 34px 30px 120px;
  box-sizing: border-box;
`;

const PageTitle = styled.h1`
  margin: 0;
  color: #3f3f3f;
  font-size: 20px;
  font-family: Pretendard Variable;
  font-weight: 600;
  text-align: center;
`;

const PlantTabs = styled.div`
  margin-top: 31px;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
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
  flex-shrink: 0;
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
  margin: 36px 0 0;
  color: #3f3f3f;
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
  bottom: 0;
  width: 2px;
  background: #78dc6e;
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 14px;
`;

const TimelineIcon = styled.div`
  position: absolute;
  left: -57px;
  top: 86px;
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

const EmptyText = styled.p`
  margin: 90px 0 0;
  text-align: center;
  color: #a8a8a8;
  font-size: 14px;
  font-weight: 600;
`;

const getImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${import.meta.env.VITE_API_URL}${url}`;
};

const getTimelineIcon = (tag) => {
  if (tag === "FAREWELL" || tag === "farewell" || tag === "작별") return "🪦";
  if (tag === "LEAF_GROWTH" || tag === "leaf" || tag === "잎 성장") return "🌿";
  if (tag === "FLOWER" || tag === "꽃 개화") return "🌼";
  if (tag === "LEAF_CHANGE" || tag === "잎 변화") return "🍃";
  return "🌱";
};

const getRecordDateText = (record) => {
  if (record.recordDateText) return record.recordDateText;
  if (record.dateText) return record.dateText;
  if (record.date) return record.date;
  if (!record.recordDate) return "";

  const date = new Date(record.recordDate);
  if (Number.isNaN(date.getTime())) return record.recordDate;

  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const normalizeTimelineRecords = (data) => {
  const records = Array.isArray(data) ? data : data?.records ?? data?.timeline ?? [];

  return records.map((record) => ({
    id: record.recordId || record.id || record.recordDate,
    date: getRecordDateText(record),
    tag: record.growthTag || record.tag || record.tagName,
    content: record.note || record.memo || record.content || "",
    imageUrl: getImageUrl(record.photoUrl || record.imageUrl),
  }));
};

const isDeadPlant = (plant) => {
  return plant.dead === true || plant.isDead === true || plant.status === "DEAD";
};

const formatDate = (date) => {
  if (!date) return "";
  return String(date).replaceAll("-", ".");
};

export default function MemorialTimeline() {
  const [deadPlants, setDeadPlants] = useState([]);
  const [selectedPlantId, setSelectedPlantId] = useState(null);
  const [timelineRecords, setTimelineRecords] = useState([]);

  const activePlant = deadPlants.find(
    (plant) => String(plant.plantId) === String(selectedPlantId)
  );

  useEffect(() => {
    const fetchDeadPlants = async () => {
      try {
        const data = await getPlants();
        const plants = Array.isArray(data) ? data : [];
        const filteredPlants = plants.filter(isDeadPlant);

        setDeadPlants(filteredPlants);

        if (filteredPlants.length > 0) {
          setSelectedPlantId(filteredPlants[0].plantId);
        }
      } catch (error) {
        console.error("죽은 식물 목록 조회 실패:", error);
      }
    };

    fetchDeadPlants();
  }, []);

  useEffect(() => {
    if (!selectedPlantId) return;

    const fetchMemorialTimeline = async () => {
      try {
        const data = await getTimeline(selectedPlantId);
        setTimelineRecords(normalizeTimelineRecords(data));
      } catch (error) {
        console.error("추모 타임라인 조회 실패:", error);
        setTimelineRecords([]);
      }
    };

    fetchMemorialTimeline();
  }, [selectedPlantId]);

  if (!activePlant) {
    return (
      <PageContainer>
        <Content>
          <PageTitle>추모 타임라인</PageTitle>
          <EmptyText>아직 추모할 식물이 없어요.</EmptyText>
        </Content>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Content>
        <PageTitle>{activePlant.nickname}</PageTitle>

        <PlantTabs>
          {deadPlants.map((plant) => (
            <PlantTab
              key={plant.plantId}
              type="button"
              $active={String(selectedPlantId) === String(plant.plantId)}
              onClick={() => setSelectedPlantId(plant.plantId)}
            >
              {plant.nickname} ({plant.recordCount})
            </PlantTab>
          ))}
        </PlantTabs>

        <MemorialInfo>
          <MemorialIcon>🪦</MemorialIcon>
          <PlantName>{activePlant.nickname}</PlantName>
          <PeriodText>{activePlant.daysTogether || activePlant.daysSinceStart || 0}일간 함께했어요</PeriodText>
          <DateRange>
            {formatDate(activePlant.startDate) || "2026.05.04"} ~ {formatDate(activePlant.deadDate || activePlant.lastWateredDate) || "2026.07.04"}
          </DateRange>
        </MemorialInfo>

        <Divider />

        <IntroText>{activePlant.nickname}와 함께한 소중한 시간을 추억해보세요</IntroText>

        {timelineRecords.length > 0 ? (
          <TimelineArea>
            <TimelineLine />
            {timelineRecords.map((record) => (
              <TimelineItem key={record.id}>
                <TimelineIcon $farewell={record.tag === "FAREWELL" || record.tag === "farewell"}>
                  {getTimelineIcon(record.tag)}
                </TimelineIcon>

                <TimelineCard
                  imageUrl={record.imageUrl}
                  dateText={record.date}
                  memo={record.content}
                />
              </TimelineItem>
            ))}
          </TimelineArea>
        ) : (
          <EmptyText>아직 남겨진 추억이 없어요.</EmptyText>
        )}
      </Content>
    </PageContainer>
  );
}