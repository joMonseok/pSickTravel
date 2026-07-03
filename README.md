# P식 여행 목업 프론트엔드

## 1. 프로젝트 개요

P식 여행은 즉흥적으로 여행/나들이 코스를 정하고 싶은 사용자를 위한 코스 추천 목업 서비스입니다. 사용자는 현재 위치, 기분, MBTI, 인원 수, 이용 가능 시간을 입력하고 추천 코스를 확인할 수 있습니다.

현재 단계는 백엔드 없이 mock 데이터를 사용하는 프론트엔드 MVP입니다.

## 2. MVP 목표

- 사용자가 추천 조건을 입력한다.
- mock 추천 결과를 받는다.
- 추천 코스 목록을 확인한다.
- 코스 상세 정보를 확인한다.
- 장소를 제보하는 흐름을 확인한다.
- 마이페이지에서 현재 세션의 추천 상태를 확인한다.

## 3. 기술 스택

- Vue 3
- Vite
- TypeScript
- Vue Router
- Vue scoped CSS
- 자체 디자인 토큰
- mockClient 기반 API 목업
- Leaflet
- CARTO Positron tile layer

현재 지도는 Leaflet + CARTO Positron 타일을 사용하는 시연용 지도입니다. 지도 데이터는 OpenStreetMap 기반이며, 운영 서비스에서는 지도 타일 제공자 사용 정책을 검토하거나 별도 지도 타일 제공자를 사용해야 합니다.

## 4. 실행 방법

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5173
npm run build
```

브라우저 접속 주소:

```text
http://127.0.0.1:5173
```

Docker 실행:

```bash
docker build -t p-style-travel-mock .
docker run --rm -p 8080:80 p-style-travel-mock
```

Docker 컨테이너 접속 주소:

```text
http://127.0.0.1:8080
```

컨테이너는 Vite 빌드 산출물을 Nginx로 정적 서빙합니다. Vue Router의 SPA 경로는 Nginx `try_files` 설정으로 `index.html`에 fallback됩니다.

## 5. 주요 라우트

| 경로 | 화면 |
| --- | --- |
| `/` | 추천 입력 화면 |
| `/courses` | 추천 결과 목록 |
| `/courses/:courseId` | 추천 코스 상세 |
| `/places/report` | 장소 제보 목업 |
| `/mypage` | 마이페이지 목업 |

## 6. mock 추천 시나리오

```text
location.name = 성수
→ 추천 코스 3개 표시

location.name = empty
→ 추천 결과 없음 상태 표시

location.name = error
→ HomePage에서 에러 표시, /courses로 이동하지 않음
```

## 7. 화면별 기능

HomePage:
- 추천 조건 입력
- 입력값 검증
- mock 추천 요청
- 성공 시 `/courses` 이동
- 실패 시 에러 표시

CourseListPage:
- 추천 응답 없음 상태
- 추천 결과 없음 상태
- 추천 코스 카드 목록
- 상세 페이지 이동

CourseDetailPage:
- 추천 응답 없음 상태
- courseId 불일치 상태
- 코스 상세 정보
- Leaflet + CARTO Positron 시연용 지도
- 장소 순서
- 이동 구간

PlaceReportPage:
- 장소 제보 폼
- 필수 입력 검증
- 제출 완료 상태

MyPage:
- 현재 세션 추천 상태
- 추천 결과 수
- 추천 장소 수
- 장소 제보 상태 목업
- 저장된 코스 목업

## 8. 데이터 흐름

```text
HomePage
→ apiClient
→ mockClient
→ mockData
→ recommendationState
→ CourseListPage
→ CourseDetailPage
→ MyPage
```

추천 결과는 localStorage에 저장하지 않고 Vue 런타임 상태에만 저장됩니다. 따라서 새로고침하거나 직접 상세 URL에 접근하면 추천 결과가 사라진 상태로 처리됩니다. 이는 현재 목업 MVP의 의도된 동작입니다.

## 9. 현재 미구현 범위

- 실제 백엔드 API 연동
- realClient fetch 구현
- 로그인/JWT
- 사용자 계정 관리
- 추천 이력 영구 저장
- 장소 제보 API 저장
- 운영용 지도 타일 제공자 검토
- 경로 탐색/폴리라인 표시
- 주소 검색/장소 검색
- 파일 업로드/이미지 미리보기
- 코스 저장 기능

## 10. 발표 시연 순서

간단한 시연 흐름:

1. `/`에서 위치명 `성수`로 추천 요청
2. `/courses`에서 추천 코스 3개 확인
3. 첫 번째 코스 상세 진입
4. 장소 순서, 이동 구간, CARTO Positron 스타일 지도와 숫자 마커 확인
5. 위치명 `empty`로 빈 결과 상태 확인
6. 위치명 `error`로 에러 상태 확인
7. `/places/report`에서 장소 제보 목업 확인
8. `/mypage`에서 현재 세션 추천 상태 확인

자세한 진행 순서는 [docs/demo-script.md](docs/demo-script.md)를 참고하세요.
