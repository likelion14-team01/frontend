import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/header/Header";
import Button from "../../components/button/Button";

import { addPlant } from "../../api/plantApi";
import { uploadPhoto } from "../../api/photoApi";
import { getSpecies } from "../../api/speciesApi";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [plantOptions, setPlantOptions] = useState([]);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isPlantListOpen, setIsPlantListOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");
  const [waterCycle, setWaterCycle] = useState("");
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const data = await getSpecies();
        setPlantOptions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("식물 종 목록 조회 실패:", error);
      }
    };

    fetchSpecies();
  }, []);

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
    setSelectedPhotoFile(null);
    setIsPlantListOpen(true);
  };

  const handleSelectPlant = (plant) => {
    setSelectedPlant(plant);
    setSearchValue(plant.name || plant.speciesName || "");
    setIsPlantListOpen(false);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedPhotoFile(file);

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
    setSelectedPhotoFile(null);
  };

  const handleWaterCycleChange = (event) => {
    const value = event.target.value;

    if (!/^\d*$/.test(value)) return;

    setWaterCycle(value);
  };

  const handleRegister = async () => {
    if (isSubmitting) return;

    const plantName = selectedPlant?.name || selectedPlant?.speciesName || searchValue.trim();
    const speciesId = selectedPlant?.id || selectedPlant?.speciesId;

    if (!plantName) {
      alert("식물 이름을 입력해주세요.");
      return;
    }

    if (!speciesId) {
      alert("목록에서 식물을 선택해주세요.");
      return;
    }

    if (!waterCycle || Number(waterCycle) < 1) {
      alert("물주기 설정을 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);

      let photoUrl = selectedPlant?.imageUrl || selectedPlant?.speciesImageUrl || "";

      if (selectedPhotoFile) {
        const uploadedPhoto = await uploadPhoto(selectedPhotoFile);
        photoUrl = uploadedPhoto?.photoUrl || uploadedPhoto?.url || uploadedPhoto || photoUrl;
      }

      const plantData = {
        nickname: plantName,
        speciesId,
        wateringIntervalDays: Number(waterCycle),
        photoUrl,
      };

      console.log("등록 요청 데이터:", plantData);

      await addPlant(plantData);

      setIsCompleteModalOpen(true);
    } catch (error) {
      console.error("식물 등록 실패:", error);
      alert("식물 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isMatchedPlant = (plantName) => {
    const keyword = searchValue.trim();

    if (!keyword) return false;

    return plantName?.includes(keyword);
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
              {plantOptions.map((plant) => {
                const plantName = plant.name || plant.speciesName;
                const category = plant.category || plant.categoryName;
                const description = plant.description || "";
                const waterCycleText = plant.waterCycleText || plant.recommendedWateringInterval || plant.wateringIntervalText || "";

                return (
                <button
                  key={plant.id || plant.speciesId}
                  type="button"
                  className={
                    isMatchedPlant(plantName)
                      ? "plantResultItem plantResultItemActive"
                      : "plantResultItem"
                  }
                  onClick={() => handleSelectPlant(plant)}
                >
                  <div className="plantResultText">
                    <strong>{plantName}</strong>
                    <p>{description}</p>
                  </div>

                  <div className="plantResultRight">
                    <span>{category}</span>
                    <p>💧 {waterCycleText}</p>
                  </div>
                </button>
                );
              })}
            </div>
          )}

          {selectedPlant && (
            <div className="selectedPlantArea">
              <span className="selectedPlantCategory">
                {selectedPlant.category || selectedPlant.categoryName}
              </span>

              <div className="selectedPlantEmoji">🪴</div>

              <h2>{selectedPlant.name || selectedPlant.speciesName}</h2>

              <p>
                {selectedPlant.description || ""}
                <br />
                추천 물주기: {selectedPlant.waterCycleText || selectedPlant.recommendedWateringInterval || selectedPlant.wateringIntervalText || ""}
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
          <Button onClick={handleRegister} disabled={isSubmitting}>
            {isSubmitting ? "등록 중..." : "식물 등록하기"}
          </Button>
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