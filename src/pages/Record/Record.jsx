import { useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/header/Header.jsx";
import Button from "../../components/button/Button.jsx";
import RecordModal from "./RecordModal.jsx";

const plantNameMap = {
  monstera: "몬스테라",
  scindapsus: "스킨답서스",
  lavender: "라벤더",
};

const tagList = ["새잎", "잎 성장", "꽃 개화", "잎 변화", "작별"];

const RecordContainer = styled.div`
    width: 100%;
    height: 890px;
    padding: 0 20px 110px;
    background-color: #F6F9F5;
`;

const PlantSelect = styled.div`
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #3f3f3f;
  font-size: 18px;
  font-weight: 700;
`;

const ArrowDown = styled.span`
  width: 10px;
  height: 10px;
  border-right: 2px solid #3f3f3f;
  border-bottom: 2px solid #3f3f3f;
  transform: rotate(45deg) translateY(-3px);
`;

const PhotoBox = styled.div`
    width: 362px;
    height: 192px;
    margin-top: 27px;
    border-radius: 20px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0px 4px 4px rgba(97, 197, 83, 0.03);
    position: relative;
    overflow: hidden;
    cursor: pointer;
`;

const PhotoInput = styled.input`
    display: none;
`;

const PreviewImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const RemovePhotoButton = styled.button`
    position: absolute;
    top: 8px;
    right: 10px;
    border: none;
    background: transparent;
    color: #78dc6e;
    font-size: 35px;
    font-weight: 500;
    cursor: pointer;
`;

const ChangePhotoButton = styled.button`
    position: absolute;
    right: 16px;
    bottom: 15px;
    width: 45px;
    height: 22px;
    border: none;
    border-radius: 999px;
    background: #E3F7E0;
    color: #60C553;
    font-size: 12px;
    font-family: Pretendard Variable;
    font-weight: 500;
    cursor: pointer;
`;

const CameraCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #78dc6e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 13px;
`;

const PhotoText = styled.span`
  color: #B5BEB5;
    font-size: 13px;
    font-family: Pretendard Variable;
    font-weight: 500;
`;

const Title = styled.p`
  color: #3f3f3f;
  font-size: 15px;
  font-weight: 600;
  font-family: Pretendard Variable;
`;

const WaterButtonRow = styled.div`
  display: flex;
  gap: 10px;
`;

const WaterButton = styled.button`
  flex: 1;
  width: 177px;
  height: 48px;
  border-radius: 999px;
  border: 2px solid #78dc6e;
  background: ${({ $active }) => ($active ? "#78dc6e" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#78dc6e")};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`;

const MemoBox = styled.textarea`
  width: 362px;
  height: 100px;
  padding: 22px;
  border: none;
  outline: none;
  resize: none;
  border-radius: 18px;
  background: #ffffff;
  color: #3f3f3f;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;

  &::placeholder {
    color: #b8beb8;
  }
`;

const TagRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const TagButton = styled.button`
  width: 62px;
  height: 80px;
  border: none;
  border-radius: 12px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  color: ${({ $active }) => ($active ? "#78dc6e" : "#9a9a9a")};
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.04);
  cursor: pointer;
`;

const TagIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid ${({ $active }) => ($active ? "#78dc6e" : "#e4e4e4")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active }) => ($active ? "#78dc6e" : "#d8d8d8")};
  font-size: 23px;
`;


const getTagIcon = (tag) => {
  switch (tag) {
    case "새잎":
      return "🌱";
    case "잎 성장":
      return "🌿";
    case "꽃 개화":
      return "🌼";
    case "잎 변화":
      return "🍃";
    case "작별":
      return "🪦";
    default:
      return "🌱";
  }
};

const ButtonWrapper = styled.div`
  margin-top: 16px;
`;

export default function Record() {
  const { plantName } = useParams();
  const navigate = useNavigate();
  const currentPlantName = plantNameMap[plantName] || "몬스테라";
  const [selectedTag, setSelectedTag] = useState("");
  const [waterStatus, setWaterStatus] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const photoInputRef = useRef(null);

  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const handlePhotoClick = () => {
    photoInputRef.current.click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = (event) => {
    event.stopPropagation();
    setSelectedImage(null);
    photoInputRef.current.value = "";
  };

  const handleSaveRecord = () => {
    setIsCompleteModalOpen(true);
  };

  const handleButtonClick = () => {
  if (selectedTag === "작별") {
    navigate("/memorialTimeline");
  } else {
    navigate("/");
  }
};

  return (
    <RecordContainer>
      <Header title="기록하기" />
      <PlantSelect>
        <span>{currentPlantName}</span>
        <ArrowDown />
      </PlantSelect>
      <PhotoBox onClick={handlePhotoClick}>
        {selectedImage ? (
          <>
            <PreviewImage src={selectedImage} />
            <RemovePhotoButton type="button" onClick={handleRemovePhoto}>
              ×
            </RemovePhotoButton>
            <ChangePhotoButton type="button">변경</ChangePhotoButton>
          </>
        ) : (
          <>
            <CameraCircle>📷</CameraCircle>
            <PhotoText>사진 추가하기</PhotoText>
          </>
        )}
      </PhotoBox>
      <PhotoInput
        ref={photoInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
      />
      <Title>오늘 물을 줬나요? 💧</Title>
      <WaterButtonRow>
        <WaterButton $active={waterStatus === "watered"} onClick={() => setWaterStatus("watered")}>
          줬어요
        </WaterButton>
        <WaterButton $active={waterStatus === "skip"} onClick={() => setWaterStatus("skip")}>
          패스할래요
        </WaterButton>
      </WaterButtonRow>
      <Title>한 줄 메모</Title>
      <MemoBox placeholder="메모를 남겨보세요" />
      <Title>성장 태그</Title>
      <TagRow>
        {tagList.map((tag) => (
          <TagButton
            key={tag}
            $active={selectedTag === tag}
            onClick={() => setSelectedTag(tag)}
          >
            <TagIcon $active={selectedTag === tag}>
              {getTagIcon(tag)}
            </TagIcon>
            <span>{tag}</span>
          </TagButton>
        ))}
      </TagRow>
        <ButtonWrapper>
            <Button onClick={handleSaveRecord}>오늘 기록 저장하기</Button>
        </ButtonWrapper>
        {isCompleteModalOpen && (
          <RecordModal
            variant={selectedTag === "작별" ? "farewell" : "complete"}
            title={selectedTag === "작별" ? "작별을 기록했어요" : "기록 완료!"}
            description={selectedTag === "작별" ? "함께한 시간은 소중한 기록으로 남았어요.": "오늘도 잘 돌봐줬어요"}
        buttonText={selectedTag === "작별" ? "추억 확인하기" : "홈으로 가기"}
        onButtonClick={handleButtonClick} />
        )}
   
    </RecordContainer>
  );
}