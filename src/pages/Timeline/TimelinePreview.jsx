import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

import Header from "../../components/header/Header.jsx";
import { saveRecord } from "../../api/recordApi.js";
import { uploadPhoto } from "../../api/photoApi.js";

const fallbackRecords = [
  {
    id: 1,
    plantName: "몬스테라",
    date: "6월 14일",
    day: "일",
    tag: "sprout",
    tagText: "새잎",
    tagMessage: "새싹이 나왔어요",
    memo: "새 잎이 올라오기 시작했다",
    waterText: "물 준 날",
    imageUrl: "",
  },
  {
    id: 2,
    plantName: "몬스테라",
    date: "6월 18일",
    day: "목",
    tag: "leaf",
    tagText: "잎 성장",
    tagMessage: "잎이 더 커졌어요",
    memo: "잎이 더 커졌다",
    waterText: "패스한 날",
    imageUrl: "",
  },
  {
    id: 3,
    plantName: "몬스테라",
    date: "6월 22일",
    day: "월",
    tag: "water",
    tagText: "잎 변화",
    tagMessage: "건강하게 자랐어요",
    memo: "물을 주고 건강하게 자랐다",
    waterText: "물 준 날",
    imageUrl: "",
  },
  {
    id: 4,
    plantName: "스투키",
    date: "6월 15일",
    day: "월",
    tag: "sprout",
    tagText: "새잎",
    tagMessage: "새싹이 나왔어요",
    memo: "첫 기록을 남겼다",
    waterText: "물 준 날",
    imageUrl: "",
  },
  {
    id: 5,
    plantName: "스투키",
    date: "6월 21일",
    day: "일",
    tag: "leaf",
    tagText: "잎 성장",
    tagMessage: "잎이 자랐어요",
    memo: "새 잎이 자랐다",
    waterText: "패스한 날",
    imageUrl: "",
  },
];

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 990px;
  background: #f6f9f5;
  overflow: hidden;
`;

const Content = styled.main`
  padding: 20px 20px 110px;
  box-sizing: border-box;
`;

const DateTitle = styled.h2`
  margin: 8px 0 22px;
  text-align: center;
  color: #3f3f3f;
  font-size: 20px;
  font-weight: 800;
`;

const PhotoBox = styled.section`
  position: relative;
  width: 100%;
  height: 270px;
  border-radius: 18px;
  overflow: hidden;
  background: #eeeeee;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: #d9d9d9;
`;

const HiddenPhotoInput = styled.input`
  display: none;
`;

const TagBadge = styled.div`
  position: absolute;
  top: 18px;
  left: 16px;
  min-width: 86px;
  height: 34px;
  padding: 0 16px;
  border-radius: 999px;
  background: #ffffff;
  color: #3f3f3f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  box-sizing: border-box;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 15px;
  right: 16px;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  font-size: 26px;
  font-weight: 300;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  z-index: 5;
`;

const ChangeButton = styled.button`
  position: absolute;
  right: 14px;
  bottom: 14px;
  height: 28px;
  padding: 0 12px;
  border: none;
  border-radius: 999px;
  background: #e8fbe7;
  color: #64c95f;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  z-index: 5;
`;

const MemoBox = styled.textarea`
  width: 100%;
  height: 140px;
  margin-top: 20px;
  padding: 20px;
  border: none;
  outline: none;
  resize: none;
  border-radius: 18px;
  background: #ffffff;
  box-sizing: border-box;
  color: #3f3f3f;
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.5;

  &::placeholder {
    color: #b8beb8;
  }
`;

const StatusRow = styled.section`
  margin-top: 14px;
  display: grid;
  grid-template-columns: 38px 1fr 38px 1.25fr;
  align-items: center;
  gap: 10px;
`;

const GrowthIconBox = styled.div`
  width: 36px;
  height: 36px;
  border: 2px solid #78dc6e;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const TextChip = styled.div`
  height: 40px;
  border-radius: 14px;
  background: #ffffff;
  color: #3f3f3f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
`;

const WaterIcon = styled.div`
  width: 38px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
`;

const WaterChip = styled.div`
  height: 40px;
  border-radius: 14px;
  background: #cdeeff;
  color: #62bdea;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
`;

const ButtonWrapper = styled.div`
  margin-top: 86px;
`;

const EditButton = styled.button`
  width: 100%;
  height: 68px;
  border: none;
  border-radius: 999px;
  background: #f0f0f0;
  color: #78dc6e;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
`;

const CompleteOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CompleteModal = styled.div`
  width: 280px;
  padding: 42px 18px 18px;
  border-radius: 28px;
  background: #ffffff;
  text-align: center;
  box-sizing: border-box;
`;

const CompleteIcon = styled.div`
  width: 86px;
  height: 86px;
  margin: 0 auto 26px;
  border-radius: 50%;
  background: #78dc6e;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 58px;
  font-weight: 500;
`;

const CompleteTitle = styled.h2`
  margin: 0 0 12px;
  color: #3f3f3f;
  font-size: 21px;
  font-weight: 800;
`;

const CompleteText = styled.p`
  margin: 0 0 20px;
  color: #a2a2a2;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
`;

const ConfirmButton = styled.button`
  width: 100%;
  height: 62px;
  border: none;
  border-radius: 999px;
  background: #78dc6e;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
`;


const getTagIcon = (tag) => {
  if (tag === "LEAF_GROWTH" || tag === "leaf" || tag === "잎 성장") return "🌿";
  if (tag === "NEW_LEAF" || tag === "sprout" || tag === "새잎") return "🌱";
  if (tag === "FLOWER" || tag === "꽃 개화") return "🌼";
  if (tag === "LEAF_CHANGE" || tag === "water" || tag === "잎 변화") return "🍃";
  if (tag === "FAREWELL" || tag === "작별") return "🪦";
  return "🌱";
};

const getTagText = (record) => {
  if (record.tagText) return record.tagText;
  if (record.growthTagText) return record.growthTagText;
  if (record.tagName) return record.tagName;

  switch (record.growthTag || record.tag) {
    case "NEW_LEAF":
    case "sprout":
      return "새잎";
    case "LEAF_GROWTH":
    case "leaf":
      return "잎 성장";
    case "FLOWER":
      return "꽃 개화";
    case "LEAF_CHANGE":
    case "water":
      return "잎 변화";
    case "FAREWELL":
      return "작별";
    default:
      return "";
  }
};

const getRecordDateValue = (record) => {
  if (record.recordDate) return record.recordDate;
  if (record.raw?.recordDate) return record.raw.recordDate;

  const currentYear = new Date().getFullYear();
  const dateText = record.date || "";
  const match = dateText.match(/(\d+)월\s*(\d+)일/);

  if (!match) return "";

  const month = String(match[1]).padStart(2, "0");
  const day = String(match[2]).padStart(2, "0");

  return `${currentYear}-${month}-${day}`;
};

const getWateredValue = (record) => {
  if (typeof record.watered === "boolean") return record.watered;
  if (typeof record.raw?.watered === "boolean") return record.raw.watered;

  return record.waterText === "물 준 날";
};

export default function TimelinePreview() {
  const { id } = useParams();
  const location = useLocation();

  const photoInputRef = useRef(null);
  const objectUrlRef = useRef("");

  const stateRecord = location.state?.record;
  const statePlantName = location.state?.plantName;
  const statePlantId = location.state?.plantId;

  const fallbackRecord = fallbackRecords.find(
    (record) => record.id === Number(id)
  );

  const record = stateRecord || fallbackRecord || fallbackRecords[0];
  const plantName = statePlantName || record.plantName || "몬스테라";

  const [previewImage, setPreviewImage] = useState(record.imageUrl || "");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [memo, setMemo] = useState(record.memo || "");
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setPreviewImage(record.imageUrl || "");
    setSelectedImageFile(null);
    setMemo(record.memo || record.note || "");

    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, [record.id, record.imageUrl, record.memo]);

  const handleChangePhotoClick = () => {
    photoInputRef.current?.click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const newImageUrl = URL.createObjectURL(file);
    setSelectedImageFile(file);
    objectUrlRef.current = newImageUrl;
    setPreviewImage(newImageUrl);
  };

  const handleRemovePhoto = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = "";
    }

    setPreviewImage("");
    setSelectedImageFile(null);

    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  };

  const handleEditComplete = async () => {
    if (isSubmitting) return;

    const plantId = statePlantId || record.plantId || record.raw?.plantId;
    const recordDate = getRecordDateValue(record);

    if (!plantId || !recordDate) {
      alert("기록 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      setIsSubmitting(true);

      let photoUrl = previewImage || "";

      if (selectedImageFile) {
        const uploadedPhoto = await uploadPhoto(selectedImageFile);
        photoUrl = uploadedPhoto?.photoUrl || uploadedPhoto?.url || uploadedPhoto || "";
      }

      const updatedRecord = {
        watered: getWateredValue(record),
        note: memo,
        growthTag: record.growthTag || record.tag || record.raw?.growthTag,
        photoUrl,
      };

      console.log("수정 완료된 기록:", updatedRecord);

      await saveRecord(plantId, recordDate, updatedRecord);
      setIsCompleteModalOpen(true);
    } catch (error) {
      console.error("기록 수정 실패:", error);
      alert("기록 수정에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <Header title={plantName} />

      <Content>
        <DateTitle>
          {record.date} ({record.day})
        </DateTitle>

        <PhotoBox>
          {previewImage ? (
            <PreviewImage src={previewImage} alt={`${plantName} 기록 사진`} />
          ) : (
            <PlaceholderImage />
          )}

          <TagBadge>{getTagText(record)}</TagBadge>

          {previewImage && (
            <RemoveButton
              type="button"
              onClick={handleRemovePhoto}
              aria-label="사진 삭제"
            >
              ×
            </RemoveButton>
          )}

          <ChangeButton type="button" onClick={handleChangePhotoClick}>
            변경
          </ChangeButton>

          <HiddenPhotoInput
            ref={photoInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </PhotoBox>

        <MemoBox
          value={memo}
          onChange={(event) => setMemo(event.target.value)}
          placeholder="메모를 입력해주세요"
        />

        <StatusRow>
          <GrowthIconBox>{getTagIcon(record.growthTag || record.tag)}</GrowthIconBox>
          <TextChip>{getTagText(record)}</TextChip>

          <WaterIcon>💧</WaterIcon>
          <WaterChip>{record.waterText}</WaterChip>
        </StatusRow>

        <ButtonWrapper>
          <EditButton type="button" onClick={handleEditComplete} disabled={isSubmitting}>
            {isSubmitting ? "수정 중..." : "수정 완료"}
          </EditButton>
        </ButtonWrapper>
      </Content>

      {isCompleteModalOpen && (
        <CompleteOverlay>
          <CompleteModal>
            <CompleteIcon>✓</CompleteIcon>

            <CompleteTitle>수정 완료!</CompleteTitle>

            <CompleteText>
              기록이 성공적으로
              <br />
              수정되었습니다.
            </CompleteText>

            <ConfirmButton
              type="button"
              onClick={() => setIsCompleteModalOpen(false)}
            >
              확인
            </ConfirmButton>
          </CompleteModal>
        </CompleteOverlay>
      )}
    </PageContainer>
  );
}