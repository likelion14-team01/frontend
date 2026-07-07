import React from "react";
import "./TimelineCard.css";

function TimelineCard({
  imageUrl,
  dateText = "6월 14일",
  memo = "새 잎이 올라오기 시작했다",
  onClick,
}) {
  return (
    <article className="timelineCard" onClick={onClick}>
      <div className="timelineCardImageArea">
        {imageUrl ? (
          <img
            className="timelineCardImage"
            src={imageUrl}
            alt="타임라인 기록 사진"
          />
        ) : (
          <div className="timelineCardImagePlaceholder" />
        )}

        <div className="timelineCardDateBadge">
          <span className="timelineCardCameraIcon">📷</span>
          <span>{dateText}</span>
        </div>
      </div>

      <div className="timelineCardMemoArea">
        <p>{memo}</p>
      </div>
    </article>
  );
}

export default TimelineCard;