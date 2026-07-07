import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/header/Header";
import "./TimelinePreview.css";

function TimelinePreview() {
  const navigate = useNavigate();
  const { recordId } = useParams();

  const [imageUrl, setImageUrl] = useState("");
  const [memo, setMemo] = useState("새 잎이 조금 올라왔다");

  const handleRemoveImage = () => {
    setImageUrl("");
  };

  const handleEditRecord = () => {
    console.log("수정할 기록 ID:", recordId);
    console.log("수정된 메모:", memo);
  };

  return (
    <div className="timelinePreviewPage">
      <Header title="몬스테라" />

      <main className="timelinePreviewContent">
        <h2 className="timelinePreviewDate">6월 14일 (일)</h2>

        <section className="previewPhotoBox">
          {imageUrl ? (
            <img
              className="previewPhotoImage"
              src={imageUrl}
              alt="몬스테라 기록 사진"
            />
          ) : (
            <div className="previewPhotoPlaceholder" />
          )}

          <div className="previewPhotoTag">새싹이 나왔어요</div>

          <button
            type="button"
            className="previewPhotoRemoveButton"
            onClick={handleRemoveImage}
            aria-label="사진 삭제"
          >
            ×
          </button>

          <button type="button" className="previewPhotoChangeButton">
            변경
          </button>
        </section>

        <textarea
          className="previewMemoBox"
          value={memo}
          onChange={(event) => setMemo(event.target.value)}
          placeholder="메모를 남겨보세요"
        />

        <section className="previewStatusRow">
          <div className="previewGrowthIconBox">
            <span>🌱</span>
          </div>

          <div className="previewGrowthTextChip">새잎</div>

          <div className="previewWaterIcon">💧</div>

          <div className="previewWaterChip">물 준 날</div>
        </section>

        <button
          type="button"
          className="previewEditButton"
          onClick={handleEditRecord}
        >
          기록 수정
        </button>
      </main>
    </div>
  );
}

export default TimelinePreview;