<div align="center">

# 🦁 멋쟁이사자처럼 14기 협업 세션

</div>

## 📖 서비스 소개

**잎새로그**는 식물을 키우는 사람들이 매일의 변화를 부담 없이 기록하고, 시간이 쌓인 뒤 성장의 흐름을 한눈에 돌아볼 수 있게 하는 서비스입니다.

- 물을 줘야 하는 날을 **서버가 계산해 알려주고** (D-day)
- 하루 한 장의 사진과 한 줄 메모로 **가볍게 기록하며**
- 쌓인 기록은 **타임라인**으로, 떠나보낸 식물은 **추모 공간**으로 남습니다.

식물의 죽음까지 하나의 이야기로 담아내는 것 — "작별" 태그를 남기면 그 식물의 시간이 추모 타임라인으로 전환되는 것이 잎새로그만의 감성 포인트입니다.

## ✨ 주요 기능

| 기능 | 설명 |
|---|---|
| 🪴 **식물 등록** | 종 선택 시 권장 급수 주기가 자동 입력되고, 우리 집 환경에 맞게 수정해 저장할 수 있어요. 목록에 없는 식물은 "기타"로 직접 등록할 수 있어요. |
| 🏡 **홈 대시보드** | 물주기 D-day, 키운 일수, 최근 7일 기록 스트릭, 최근 소식("3일 전 꽃이 폈어요")을 카드 한 장에 — 모든 계산은 서버가 담당해요. |
| 📝 **하루 기록** | 물 줌 여부 + 사진 + 한 줄 메모 + 성장 태그(새잎·잎 성장·꽃 개화·잎 변화·작별)를 하루 단위로 기록해요. 같은 날 다시 저장하면 자동으로 수정 처리(upsert)돼요. |
| 🎞️ **타임라인** | 전체 기록을 날짜순으로 스크롤하며 성장 과정을 돌아볼 수 있어요. 성장 태그는 마일스톤 아이콘으로 표시돼요. |
| 🕊️ **추모 공간** | "작별" 태그를 남기면 함께한 기간·기록 수와 함께 추모 타임라인으로 전환돼요. 죽음도 기록의 일부로 남습니다. |
| 📷 **사진 업로드** | 사진 선택 즉시 업로드되어 URL로 관리되는 2단계 구조로, 등록 대표 사진과 일일 기록 사진에 공용으로 쓰여요. |

## 🛠 기술 스택

| 분류 | 기술 |
|---|---|
| Language | Java 21 |
| Framework | Spring Boot 3.x, Spring Data JPA |
| Database | MySQL 8.0 |
| Infra | AWS EC2 (Ubuntu), Nginx (Reverse Proxy + HTTPS/Certbot), Gabia DNS |
| CI/CD | GitHub Actions (push → build → deploy 자동화) |
| Docs | Swagger (springdoc-openapi), Notion API 명세서 |
| Collaboration | GitHub, Notion, Discord |

## 🏗 아키텍처

```
[Client (React/Netlify)]
        │  HTTPS
        ▼
[Nginx (api.wacaw.shop, SSL)]
        │  Reverse Proxy :8080
        ▼
[Spring Boot Application] ──── [MySQL 8.0]
        ▲                        (EC2 내 구동)
        │  jar 전송 + 재시작
[GitHub Actions CI/CD]  ◀── main push
```

**배포 파이프라인**: `main` 브랜치에 push하면 GitHub Actions가 Gradle 빌드 → jar를 EC2로 전송 → 무중단에 가까운 프로세스 교체까지 자동 수행합니다. 배포 실패 시 서버 로그 50줄이 Actions 로그에 자동 출력되어 빠른 원인 파악이 가능합니다.

**설계 하이라이트**
- **공통 응답 규격(BaseResponse)**: 모든 API가 `{success, code, message, data}` 형태로 응답해 프론트엔드 처리 로직을 단일화했습니다.
- **계산은 서버에서**: D-day, 스트릭, 경과일 등 화면에 필요한 모든 계산 필드를 서버가 내려줘 프론트는 렌더링에만 집중합니다.
- **하루 1기록 보장**: `UNIQUE(plant_id, record_date)` 제약 + PUT upsert 설계로 중복 없는 일일 기록을 DB 레벨에서 보장합니다.
- **죽음 처리의 단일 경로**: "작별" 태그 저장 시 같은 트랜잭션에서 `died_at`이 갱신되는 유일한 경로를 두어, 기록과 상태가 어긋날 수 없는 구조로 설계했습니다.

- ### 🎯 Git Convention

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

# 🌱 잎새로그 (LeafLog)

> 반려식물과 함께한 매일을 기록하는 식물 성장 일기 서비스

---
