# 공지 게시물 영구 저장 및 복구 (Implementation Plan)

## 목표 설명
사용자가 2월에 올린 영상은 정상적으로 보이지만, **공지/뉴스**에 올린 게시물이 페이지 새로고침 후 사라지는 문제가 있습니다. 이는 현재 `PostContext`가 원격 API에서 데이터를 가져오고, API가 실패하거나 페이지가 새로고침될 때 메모리 상태만 사용하기 때문입니다.

## 사용자 검토 필요
> [!IMPORTANT]
> 아래 변경 사항은 `src/context/PostContext.jsx` 에 **localStorage** 연동과 **API 오류 배너**를 추가합니다. 배너를 **전체 페이지**에 표시할지, **홈/공지 페이지**에만 표시할지 선택해 주세요.

## 제안된 변경 사항
---
### [MODIFY] src/context/PostContext.jsx
- 초기 상태를 `localStorage.getItem('posts')` 로 로드하고, 파싱 실패 시 `defaultPosts` 로 fallback.
- `useEffect` 에서 API 호출 성공 시 `localStorage.setItem('posts', JSON.stringify(data))` 로 최신 데이터를 저장.
- `addPost`, `editPost`, `deletePost` 에서 상태 업데이트 후 `localStorage` 동기화.
- 새로운 상태 `apiError` (boolean) 를 추가하고, API 호출 실패 시 `true` 로 설정.
- `saveToLocalStorage(posts)` 헬퍼 함수 정의.
- 컨텍스트 반환값에 `apiError` 포함.

### [MODIFY] src/pages/HomePage.jsx (또는 Notice 페이지)
- `apiError` 가 `true` 일 때, 얇은 배너를 표시하여 "서버와 연결할 수 없습니다. 로컬 저장소에서 데이터를 불러왔습니다." 라고 알림.
- 배너 위치는 **전체 페이지**에 적용할지, **공지/뉴스 페이지**에만 적용할지 선택 필요.

### [OPTIONAL] src/pages/NoticePage.jsx (존재한다면) 동일 배너 적용
- 위와 동일 로직을 적용해 사용자 경험을 일관되게 함.

---
## 열려 있는 질문
> [!WARNING]
> **배너 표시 위치**: 전체 페이지에 표시할까요, 아니면 홈/공지 페이지에만 표시할까요?

## 검증 계획
### 자동 테스트
- `npm run dev` 로 개발 서버 실행 후, 공지 게시물 추가 → 페이지 새로고침 → 게시물이 유지되는지 확인.
- `API_BASE_URL` 을 잘못된 주소로 바꾸어 API 오류를 강제 → 배너가 표시되고, 로컬 저장소에서 데이터가 로드되는지 확인.

### 수동 검증
- 실제 배포 후 공지 게시물 작성 → 새로고침 → 사라지지 않는지 확인.
- 서버가 일시 중단된 상황에서 배너가 정상적으로 보이는지 확인.

---
## 다음 단계
1. 위 질문에 대한 사용자 답변을 받음.
2. 답변에 따라 코드를 수정하고 커밋.
3. 로컬에서 테스트 후 배포.
