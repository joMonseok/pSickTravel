# P식 여행 API 프로토콜 명세서

## 1. 문서 정보

* 문서명: P식 여행 API 프로토콜 명세서
* 문서 버전: v1.4.1-draft
* 대상: Frontend, Backend
* 목적: 프론트엔드와 백엔드 간 요청/응답 계약을 명확히 정의하고, 추가 논의 없이 구현 가능하도록 한다.

---

## 2. 설계 원칙

1. 본 문서는 구현 계약 문서이다.
2. 모든 필드는 명시적으로 정의되어야 한다.
3. 암묵적 규칙은 허용하지 않는다.
4. 프론트엔드는 계산을 수행하지 않는다.
5. 백엔드는 완결된 데이터를 제공해야 한다.

---

## 3. 공통 규약

### 3.1 Base URL

```text
/api/v1
```

### 3.2 Content-Type

```text
application/json; charset=utf-8
```

### 3.3 Response Envelope

```json
{
  "success": true,
  "data": {},
  "error": null,
  "timestamp": "2026-04-06T10:30:00+09:00"
}
```

### 3.4 Timestamp 규칙

* ISO 8601 형식
* Asia/Seoul (+09:00) 고정

### 3.5 인증 방식

```text
Authorization: Bearer {JWT}
```

### 3.6 Null / Empty 규칙

* 배열 타입: null 금지 → 항상 []
* Object: nullable 명시 없으면 null 금지
* undefined 금지

### 3.7 Error Details 규칙

```json
[
  { "field": "string", "reason": "string" }
]
```

* 필드 기반 오류 시 사용한다.
* 필드와 무관한 오류는 []로 반환한다.
* `field`는 Request Body 기준 dot notation을 사용한다.
* 예: `location.lat`, `location.lng`, `peopleCount`, `startTime`

### 3.8 문자열 / 언어 규칙

* 필드명 / enum / error.code → 영어
* message / reason → 한국어 허용

### 3.9 시스템 타임아웃 규약

* 본 API는 복합 경로 연산을 포함하므로, 서버 최대 응답 시간은 10초(10,000ms)로 보장한다.
* 프론트엔드 클라이언트 타임아웃 설정은 15초 이상을 권장한다.

---

## 4. Enum 정의

### 4.1 MoodType

| 값         |
| --------- |
| HEALING   |
| REFRESH   |
| ACTIVE    |
| BORED     |
| EMOTIONAL |

* 확장 시 minor version 증가

### 4.2 AvailableTimeType

| 값        |
| -------- |
| SHORT    |
| MEDIUM   |
| HALF_DAY |

* 자유 입력 금지

### 4.3 PlaceCategoryType

| 값            |
| ------------ |
| CAFE         |
| PARK         |
| RESTAURANT   |
| EXHIBITION   |
| WALKING_SPOT |
| VIEWPOINT    |
| SHOPPING     |
| ETC          |

### 4.4 MoveMethodType

| 값       |
| ------- |
| WALK    |
| TRANSIT |
| CAR     |
| MIXED   |

### 4.5 MbtiType

| 값    |
| ---- |
| ISTJ |
| ISFJ |
| INFJ |
| INTJ |
| ISTP |
| ISFP |
| INFP |
| INTP |
| ESTP |
| ESFP |
| ENFP |
| ENTP |
| ESTJ |
| ESFJ |
| ENFJ |
| ENTJ |

### 4.6 RecommendationSortType

| 값        | 설명                   |
| -------- | -------------------- |
| DISTANCE | 기준 좌표 직선 거리(km) 오름차순 |
| RATING   | 내부 추천 점수(score) 내림차순 |

* 내부 정책 기준으로 정렬한다.
* 외부 API의 평점 또는 정렬 정책에 의존하지 않는다.

---

## 5. API 목록

| Method | Path             | 설명       |
| ------ | ---------------- | -------- |
| POST   | /recommendations | 추천 코스 생성 |

---

## 6. Request Schema

### 6.1 Body

| 필드            | 타입                     | 필수 | 설명       | 제약                    |
| ------------- | ---------------------- | -- | -------- | --------------------- |
| location.lat  | Double                 | Y  | 위도       | -90 ~ 90              |
| location.lng  | Double                 | Y  | 경도       | -180 ~ 180            |
| location.name | String                 | Y  | 표시용 위치명  | 계산 미사용                |
| mood          | MoodType               | Y  | 기분       | enum                  |
| mbti          | MbtiType               | Y  | MBTI     | enum                  |
| peopleCount   | Integer                | Y  | 인원 수     | 1 ~ 10                |
| availableTime | AvailableTimeType      | Y  | 시간       | enum                  |
| startTime     | String                 | Y  | 여행 시작 시각 | ISO 8601 (Asia/Seoul) |
| radius        | Integer                | N  | 탐색 반경    | 단위: 미터(m), 기본값 3000   |
| sort          | RecommendationSortType | N  | 정렬 기준    | 기본 RATING             |

### 6.2 Request 규칙

* location.name은 UI 표시용이며 추천 계산에는 사용하지 않는다.
* startTime은 여행 시작 기준 시각이며, 서버는 해당 시각을 기준으로 장소 영업 여부와 이동 시간을 계산한다.
* radius 미전달 시 서버 기본 반경 3000m를 사용한다.
* sort 미전달 시 기본값 RATING을 사용한다.

---

## 7. Business Rules

### 7.1 코스 규칙

* courses는 최대 3개까지 반환한다.
* totalCount == courses.length
* courses는 요청 sort 기준에 따라 정렬한다.
* sort=RATING인 경우 내부 추천 점수(score) 기준 내림차순으로 정렬한다.
* sort=DISTANCE인 경우 기준 좌표 직선 거리 기준 오름차순으로 정렬한다.
* courses[0] = 해당 정렬 기준에서의 최우선 추천

### 7.2 routeSegments 정합성

* routeSegments.length == places.length - 1
* fromOrder → toOrder는 반드시 연속되어야 한다.
* 예: 1→2, 2→3

### 7.3 시간 규칙

* totalDurationMinutes = Σ(routeSegments.durationMinutes) + Σ(체류시간)
* 체류시간은 서버 내부 계산값이며 응답에 포함하지 않는다.

---

## 8. Response Schema

### 8.1 최상위

| 필드              | 타입          | 설명    |
| --------------- | ----------- | ----- |
| success         | Boolean     | 성공 여부 |
| data.totalCount | Integer     | 코스 개수 |
| data.courses    | Array       | 코스 목록 |
| error           | Object/null | 오류 정보 |
| timestamp       | String      | 응답 시각 |

### 8.2 Course

| 필드                   | 타입      | 설명           |
| -------------------- | ------- | ------------ |
| id                   | String  | UUID v4      |
| title                | String  | 제목 (1~100)   |
| totalDurationMinutes | Integer | 총 시간(분)      |
| totalDurationLabel   | String  | 표시용 시간 문자열   |
| reason               | String  | 추천 이유 (≤300) |
| places               | Array   | 장소 목록        |
| routeSegments        | Array   | 이동 정보        |

#### Course 규칙

* `totalDurationLabel`은 서버가 생성한 최종 표시 문자열이다.
* 형식은 `"{숫자}분"` 또는 `"{숫자}시간 {숫자}분"`으로 고정한다.
* `places` 배열은 방문 순서를 그대로 보장한다.
* `places[0]`은 첫 방문 장소이며, 각 원소의 `order`와 배열 순서는 일치해야 한다.

### 8.3 Place

| 필드            | 타입                | 설명         | 제약                                          |
| ------------- | ----------------- | ---------- | ------------------------------------------- |
| id            | String            | 장소 ID      | 내부 ID 또는 외부 API ID 사용 가능. 시스템 내에서는 문자열로만 취급 |
| order         | Integer           | 방문 순서      | 1 이상                                        |
| name          | String            | 장소명        | 1~100자                                      |
| category      | PlaceCategoryType | 장소 카테고리    | enum                                        |
| lat           | Double            | 위도         | -90 ~ 90, 소수점 6자리 이상 권장                     |
| lng           | Double            | 경도         | -180 ~ 180, 소수점 6자리 이상 권장                   |
| address       | String            | 주소         | 최대 255자                                     |
| thumbnailUrl  | String/null       | 대표 이미지 URL | 절대 경로(https://...) 권장                       |
| businessHours | String/null       | 영업 시간 정보   | nullable 허용                                 |

#### Place 예시

```json
{
  "id": "place_001",
  "order": 1,
  "name": "카페 온기",
  "category": "CAFE",
  "lat": 37.544100,
  "lng": 127.055700,
  "address": "서울 성동구 ...",
  "thumbnailUrl": null,
  "businessHours": "매일 10:00~22:00"
}
```

### 8.4 RouteSegment

| 필드              | 타입             | 설명             | 제약                             |
| --------------- | -------------- | -------------- | ------------------------------ |
| fromOrder       | Integer        | 출발 장소 순서       | 연속 순서                          |
| toOrder         | Integer        | 도착 장소 순서       | 연속 순서                          |
| moveMethod      | MoveMethodType | 이동 수단          | enum                           |
| durationMinutes | Integer        | 이동 시간(분)       | 1 이상                           |
| distanceMeters  | Integer        | 이동 거리(m)       | 1 이상                           |
| polyline        | String/null    | 지도 렌더링용 경로 데이터 | Google Encoded Polyline Format |

#### RouteSegment 예시

```json
{
  "fromOrder": 1,
  "toOrder": 2,
  "moveMethod": "WALK",
  "durationMinutes": 12,
  "distanceMeters": 850,
  "polyline": null
}
```

### 8.5 성공 응답 예시

```json
{
  "success": true,
  "data": {
    "totalCount": 1,
    "courses": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "성수 감성 카페 산책 코스",
        "totalDurationMinutes": 95,
        "totalDurationLabel": "1시간 35분",
        "reason": "감성적인 분위기의 카페와 산책 장소를 함께 즐길 수 있는 코스입니다.",
        "places": [
          {
            "id": "place_001",
            "order": 1,
            "name": "카페 온기",
            "category": "CAFE",
            "lat": 37.544100,
            "lng": 127.055700,
            "address": "서울 성동구 ...",
            "thumbnailUrl": null,
            "businessHours": "매일 10:00~22:00"
          },
          {
            "id": "place_002",
            "order": 2,
            "name": "서울숲",
            "category": "PARK",
            "lat": 37.544388,
            "lng": 127.037442,
            "address": "서울 성동구 ...",
            "thumbnailUrl": "https://example.com/images/seoulforest.jpg",
            "businessHours": null
          }
        ],
        "routeSegments": [
          {
            "fromOrder": 1,
            "toOrder": 2,
            "moveMethod": "WALK",
            "durationMinutes": 15,
            "distanceMeters": 1100,
            "polyline": null
          }
        ]
      }
    ]
  },
  "error": null,
  "timestamp": "2026-04-06T10:30:00+09:00"
}
```

---

## 9. Error Schema

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "E4001_INVALID_REQUEST",
    "message": "요청 오류",
    "details": []
  },
  "timestamp": "2026-04-06T10:30:00+09:00"
}
```

### 9.1 Error Code 목록

| HTTP Status | Code                         | 설명                  |
| ----------- | ---------------------------- | ------------------- |
| 400         | E4001_INVALID_REQUEST        | 요청 형식 오류            |
| 401         | E4011_EXPIRED_TOKEN          | 인증 토큰 만료 또는 유효하지 않음 |
| 404         | E4041_SERVICE_AREA_NOT_FOUND | 서비스 미지원 지역          |
| 422         | E4221_INVALID_ENUM_VALUE     | enum 값 오류           |
| 422         | E4222_INVALID_COORDINATE     | 좌표 값 범위 오류          |
| 422         | E4223_INVALID_PEOPLE_COUNT   | 인원 수 범위 오류          |
| 500         | E5000_INTERNAL_SERVER_ERROR  | 서버 내부 오류            |

### 9.2 Error 처리 규칙

* 프론트엔드는 `error.code`를 기준으로 분기 처리한다.
* `details`는 필드 기반 오류일 때만 사용한다.
* `추천 결과 없음`은 에러가 아니라 정상 응답이며, `totalCount = 0`, `courses = []`로 처리한다.

---

## 10. API Scope

* v1에서는 pagination을 지원하지 않는다.
* `courses`는 최대 3개까지 반환되며, 추가 페이지 요청은 제공하지 않는다.
* 향후 확장 시 pagination 정책을 별도 버전에서 정의한다.
* v1: 단일 추천 API

### 향후 확장

* GET /recommendations/{id}
* POST /recommendations/feedback

---

## 11. 문서 범위

### 포함

* API 계약

### 제외

* DB 설계
* 외부 API 연동
* 추천 알고리즘

---

## 12. 프론트엔드 구현 참고

* `polyline`은 Google Encoded Polyline Format 문자열로 전달된다.
* 프론트엔드는 네이버 지도 SDK에 직접 문자열을 넣지 않고, 디코딩 라이브러리 또는 유틸리티를 사용해 좌표 배열로 변환한 뒤 `naver.maps.Polyline`의 `path`에 주입해야 한다.

---

## 13. 결론

본 문서는 프론트엔드와 백엔드 간 추가 논의 없이 구현 가능한 최종 계약서이다.

---

## 14. 변경 이력

* v1.4.0: startTime 필드 추가, radius 기본값 3000m 명시, thumbnailUrl 제약 보강, polyline 포맷 확정, 시스템 타임아웃 규약 추가
* v1.4.1-draft: 정렬 규칙 충돌 문구 수정, MBTI enum 전체 명시, Error Details field 표기 규칙 추가, 성공 응답 예시 추가
