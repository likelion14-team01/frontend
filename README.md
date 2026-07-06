<div align="center">

# 🦁 멋쟁이사자처럼 14기 협업 세션

</div>

---

### 📌 프로젝트 소개

본 프로젝트는 사용자가 식물의 성장 과정을 기록하고 관리할 수 있는 서비스를 개발하는 프로젝트입니다.
사용자는 식물을 등록하고 성장 사진과 메모를 기록할 수 있으며, 물주기와 성장 상태를 관리하고 성장 과정을 타임라인 형태로 확인할 수 있도록 구현할 예정입니다.

---

### ✨ 주요 기능

- 식물 등록
- 식물 상세 조회
- 성장 기록
- 성장 타임라인 조회
- 물주기 기록 및 관리

---

### 🎯 Git Convention

- 🎉 **Start** : Start New Project [:tada:]
- ✨ **Feat** : 새로운 기능 추가 [:sparkles:]
- 🐛 **Fix** : 버그 수정 [:bug:]
- 🎨 **Design** : CSS 등 사용자 UI 디자인 변경 [:art:]
- ♻️ **Refactor** : 코드 리팩토링 [:recycle:]
- 🔧 **Settings** : 설정 파일 수정 [:wrench:]
- 🗃️ **Comment** : 필요한 주석 추가 및 변경 [:card_file_box:]
- ➕ **Dependency/Plugin** : 라이브러리 추가 [:heavy_plus_sign:]
- 📝 **Docs** : 문서 수정 [:memo:]
- 🔀 **Merge** : 브랜치 병합 [:twisted_rightwards_arrows:]
- 🚀 **Deploy** : 배포 관련 작업 [:rocket:]
- 🚚 **Rename** : 파일 및 폴더 이름 수정 [:truck:]
- 🔥 **Remove** : 파일 삭제 [:fire:]
- ⏪️ **Revert** : 이전 버전으로 롤백 [:rewind:]

---

### 🌲 Branch Convention

- `main` : 배포 가능한 브랜치
- `develop` : 개발 브랜치
- `feat/#이슈번호/명칭` : 새로운 기능 개발 브랜치  
  - 예시 : `feat/#12/login`
- `ui/#이슈번호/명칭` : UI 작업 브랜치  
  - 예시 : `ui/#12/home`
- `refactor/#이슈번호/명칭` : 리팩토링 작업 브랜치  
  - 예시 : `refactor/#12/component-structure`

---

### 🌊 Flow

1. Issue 생성
2. 최신 `develop` 브랜치에서 작업 브랜치 생성
3. 기능 개발 및 커밋 진행
4. `develop` 브랜치로 Pull Request 생성
5. 코드 리뷰 진행
6. 리뷰 완료 후 `develop` 브랜치로 병합
7. 병합 완료 후 작업 브랜치 삭제