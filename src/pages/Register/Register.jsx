import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/header/Header";
import Button from "../../components/button/Button";

import "./Register.css";

const PLANT_OPTIONS = [
  {
    id: 1,
    name: "몬스테라",
    category: "관엽식물",
    description: "밝은 간접광에서 잘 자라요",
    waterCycleText: "5~7일",
  },
  {
    id: 2,
    name: "스킨답서스",
    category: "관엽식물",
    description: "초보자도 쉽게 기를 수 있어요",
    waterCycleText: "7~10일",
  },
  {
    id: 3,
    name: "스투키",
    category: "다육·선인장",
    description: "물을 자주 주지 않아도 돼요",
    waterCycleText: "2~3주",
  },
];

function Register() {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isPlantListOpen, setIsPlantListOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");
  const [waterCycle, setWaterCycle] = useState("");
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const handleOpenPlantList = () => {
    if (!selectedPlant) {
      setIsPlantListOpen(true);
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setSelectedPlant(null);
    setIsPlantListOpen(true);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setSelectedPlant(null);
    setWaterCycle("");
    setIsPlantListOpen(true);
  };

  const handleSelectPlant = (plant) => {
    setSelectedPlant(plant);
    setSearchValue(plant.name);
    setIsPlantListOpen(false);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
  };

  const handleRemovePhoto = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    setPhotoPreview("");
  };

  const handleWaterCycleChange = (event) => {
    const value = event.target.value;

    if (!/^\d*$/.test(value)) return;

    setWaterCycle(value);
  };

  const handleRegister = () => {
    const plantName = selectedPlant?.name || searchValue.trim();

    if (!plantName) {
      alert("식물 이름을 입력해주세요.");
      return;
    }

    if (!waterCycle || Number(waterCycle) < 1) {
      alert("물주기 설정을 입력해주세요.");
      return;
    }

    const newPlant = {
      id: Date.now(),
      name: plantName,
      category: selectedPlant?.category || "직접 입력",
      description: selectedPlant?.description || "",
      waterCycle: Number(waterCycle),
      photo: photoPreview,
    };

    console.log("등록할 식물 데이터:", newPlant);
    setIsCompleteModalOpen(true);
  };

  const isMatchedPlant = (plantName) => {
    const keyword = searchValue.trim();

    if (!keyword) return false;

    return plantName.includes(keyword);
  };

  return (
    <div className="registerPage">
      <Header title="식물등록" />

      <main className="registerContent">
        <section className="registerCard">
          <label className="registerLabel">식물검색</label>

          <div className="searchInputBox" onClick={handleOpenPlantList}>
            <span className="searchIcon">⌕</span>

            <input
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={handleOpenPlantList}
              className="searchInput"
              placeholder="식물이름으로 검색하세요"
            />

            {searchValue && (
              <button
                type="button"
                className="clearSearchButton"
                onClick={handleClearSearch}
              >
                ×
              </button>
            )}
          </div>

          {isPlantListOpen && !selectedPlant && (
            <div className="plantResultBox">
              {PLANT_OPTIONS.map((plant) => (
                <button
                  key={plant.id}
                  type="button"
                  className={
                    isMatchedPlant(plant.name)
                      ? "plantResultItem plantResultItemActive"
                      : "plantResultItem"
                  }
                  onClick={() => handleSelectPlant(plant)}
                >
                  <div className="plantResultText">
                    <strong>{plant.name}</strong>
                    <p>{plant.description}</p>
                  </div>

                  <div className="plantResultRight">
                    <span>{plant.category}</span>
                    <p>💧 {plant.waterCycleText}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {selectedPlant && (
            <div className="selectedPlantArea">
              <span className="selectedPlantCategory">
                {selectedPlant.category}
              </span>

              <div className="selectedPlantEmoji">🪴</div>

              <h2>{selectedPlant.name}</h2>

              <p>
                {selectedPlant.description}
                <br />
                추천 물주기: {selectedPlant.waterCycleText}
              </p>
            </div>
          )}

          <label className="registerLabel photoLabel">
            식물 사진 추가 (선택)
          </label>

          <label className={photoPreview ? "photoPreviewBox" : "photoUploadBox"}>
            <input
              type="file"
              accept="image/*"
              className="photoInput"
              onChange={handlePhotoChange}
            />

            {photoPreview ? (
              <>
                <img src={photoPreview} alt="선택한 식물" />

                <button
                  type="button"
                  className="removePhotoButton"
                  onClick={handleRemovePhoto}
                  aria-label="사진 삭제"
                >
                  ×
                </button>

                <span className="changePhotoButton">변경</span>
              </>
            ) : (
              <div className="photoUploadInner">
                <div className="cameraCircle">
                  <span className="cameraIcon">📷</span>
                </div>

                <span className="photoUploadText">사진 선택하기</span>
              </div>
            )}
          </label>

          <div className="waterSettingArea">
            <span className="registerLabel">물주기설정</span>

            <div className="waterSettingControl">
              <span className="waterDrop">💧</span>

              <input
                type="text"
                inputMode="numeric"
                value={waterCycle}
                onChange={handleWaterCycleChange}
                placeholder="일수"
              />

              <span>일마다</span>
            </div>
          </div>
        </section>

        <div className="registerButtonArea">
          <Button onClick={handleRegister}>식물 등록하기</Button>
        </div>
      </main>

      {isCompleteModalOpen && (
        <div className="modalOverlay">
          <div className="completeModal">
            <div className="completeIcon">✓</div>

            <h2>등록 완료!</h2>

            <p>
              오늘부터 식물의 시간을
              <br />
              함께 기록해 보세요.
            </p>

            <button
              type="button"
              className="goHomeButton"
              onClick={() => navigate("/")}
            >
              홈으로 가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;