import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.03);
`;

const ImageArea = styled.div`
  position: relative;
  width: 100%;
  height: 172px;
  background: #eeeeee;
  overflow: hidden;
`;

const TimelineImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: #eeeeee;
`;

const DateBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 14px;
  height: 22px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.55);
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  backdrop-filter: blur(4px);
`;

const CameraIcon = styled.span`
  font-size: 10px;
  line-height: 1;
`;

const MemoArea = styled.div`
  width: 100%;
  min-height: 58px;
  padding: 18px 16px;
  background: #ffffff;
  box-sizing: border-box;
`;

const MemoText = styled.p`
  margin: 0;
  color: #3f3f3f;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
`;

export default function TimelineCard({ imageUrl, dateText, memo }) {
  return (
    <Card>
      <ImageArea>
        {imageUrl ? (
          <TimelineImage src={imageUrl} alt="타임라인 기록 사진" />
        ) : (
          <PlaceholderImage />
        )}

        <DateBadge>
          <CameraIcon>📷</CameraIcon>
          <span>{dateText}</span>
        </DateBadge>
      </ImageArea>

      <MemoArea>
        <MemoText>{memo}</MemoText>
      </MemoArea>
    </Card>
  );
}