import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import TimelineCard from "./TimelineCard.jsx";
import { getPlants } from "../../api/plantApi.js";
import { getTimeline } from "../../api/timelineApi.js";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fbfdf9;
  overflow-y: auto;
`;

const Content = styled.div`
  width: 100%;
  padding: 47px 12px 160px;
  box-sizing: border-box;
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
  gap: 11px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 12px 6px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
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
  flex-shrink: 0;
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
  bottom: 73px;
  width: 2px;
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

const CardWrapper = styled.button`
  width: 294px;
  padding: 0;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
`;

const EmptyText = styled.p`
  margin: 80px 0 0;
  text-align: center;
  color: #a8a8a8;
  font-size: 14px;
  font-weight: 600;
`;


const getImageUrl = (url) => {
  if (!url) return "";

  if (url.startsWith("http")) {
    return url;
  }

  return `${import.meta.env.VITE_API_URL}${url}`;
};

const getTagIcon = (tag) => {
  if (tag === "LEAF_GROWTH" || tag === "leaf" || tag === "잎 성장") return "🌿";
  if (tag === "NEW_LEAF" || tag === "sprout" || tag === "새잎") return "🌱";
  if (tag === "FLOWER" || tag === "꽃 개화") return "🌼";
  if (tag === "LEAF_CHANGE" || tag === "잎 변화") return "🍃";
  if (tag === "FAREWELL" || tag === "작별") return "🪦";
  return "🌱";
};

const getRecordDateText = (record) => {
  if (record.recordDateText) return record.recordDateText;
  if (record.dateText) return record.dateText;
  if (record.date) return record.date;
  if (!record.recordDate) return "";

  const date = new Date(record.recordDate);

  if (Number.isNaN(date.getTime())) {
    return record.recordDate;
  }

  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const normalizeTimelineRecords = (data) => {
  const records = Array.isArray(data) ? data : data?.records ?? data?.timeline ?? [];

  return records.map((record) => ({
    id: record.recordId || record.id,
    date: getRecordDateText(record),
    tag: record.tag || record.growthTag || record.tagName,
    tagText: record.tagText || record.growthTagText || record.tagName,
    tagMessage: record.tagMessage || record.growthMessage || "",
    memo: record.note || record.memo || record.content || "",
    waterText: record.waterText || (record.watered ? "물 준 날" : "패스한 날"),
    imageUrl: getImageUrl(record.photoUrl || record.imageUrl),
    raw: record,
  }));
};

export default function Timeline() {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [selectedPlantId, setSelectedPlantId] = useState(null);
  const [timelineRecords, setTimelineRecords] = useState([]);

  const selectedPlant = plants.find(
    (plant) => String(plant.plantId) === String(selectedPlantId)
  );

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const data = await getPlants();
        const plantList = Array.isArray(data) ? data : [];

        setPlants(plantList);

        if (plantList.length > 0) {
          setSelectedPlantId(plantList[0].plantId);
        }
      } catch (error) {
        console.error("식물 목록 조회 실패:", error);
      }
    };

    fetchPlants();
  }, []);

  useEffect(() => {
    if (!selectedPlantId) return;

    const fetchTimeline = async () => {
      try {
        const data = await getTimeline(selectedPlantId);
        setTimelineRecords(normalizeTimelineRecords(data));
      } catch (error) {
        console.error("타임라인 조회 실패:", error);
        setTimelineRecords([]);
      }
    };

    fetchTimeline();
  }, [selectedPlantId]);

  const handleTimelineCardClick = (record) => {
    navigate(`/timelinepreview/${record.id}`, {
      state: {
        plantName: selectedPlant?.nickname,
        record,
      },
    });
  };

  return (
    <PageContainer>
      <Content>
        <PageTitle>{selectedPlant?.nickname || ""}</PageTitle>

        <PlantTabs>
          {plants.map((plant) => (
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

        {timelineRecords.length > 0 ? (
          <TimelineArea>
            <TimelineLine />

            {timelineRecords.map((record) => (
              <TimelineItem key={record.id}>
                <TimelineIcon>{getTagIcon(record.tag)}</TimelineIcon>

                <CardWrapper
                  type="button"
                  onClick={() => handleTimelineCardClick(record)}
                >
                  <TimelineCard
                    dateText={record.date}
                    memo={record.memo}
                    imageUrl={record.imageUrl}
                  />
                </CardWrapper>
              </TimelineItem>
            ))}
          </TimelineArea>
        ) : (
          <EmptyText>아직 등록된 기록이 없어요.</EmptyText>
        )}
      </Content>

    </PageContainer>
  );
}