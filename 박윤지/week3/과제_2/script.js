// DOM 요소 선택
const languageSelect = document.getElementById("language");
const getFactBtn = document.getElementById("getFactBtn");
const getMultipleBtn = document.getElementById("getMultipleBtn");
const factCount = document.getElementById("factCount");
const factContainer = document.getElementById("factContainer");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

// API URL
const API_URL = "https://meowfacts.herokuapp.com";

// 유틸리티 함수들
function showLoading() {
  loading.classList.remove("hidden"); // 로딩 메시지 표시
}

function hideLoading() {
  loading.classList.add("hidden"); // 로딩 메시지 숨김
}

function showError(message) {
  error.textContent = message; // 에러 메시지 설정
  error.classList.remove("hidden"); // 에러 메시지 표시
  setTimeout(() => error.classList.add("hidden"), 3000); // 3초 후 자동으로 숨김
}

function displayFacts(facts) {
  factContainer.innerHTML = ""; // 기존 내용을 비우기

  // 전달된 데이터가 단일 문자열일 수도 있으므로 배열로 변환
  const factsArray = Array.isArray(facts) ? facts : [facts];

  factsArray.forEach((fact, index) => {
    const factCard = document.createElement("div");
    factCard.className = "fact-card";

    // 만약 여러 개의 팩트가 있다면 번호를 붙여서 표시
    if (factsArray.length > 1) {
      factCard.textContent = `${index + 1}. ${fact}`;
    } else {
      factCard.textContent = fact;
    }

    factContainer.appendChild(factCard); // 생성한 요소를 factContainer에 추가
  });
}

// #1: API 호출 함수 구현 (비동기 처리 + fetch 사용)
// - 현재 선택된 언어 값을 가져온다.
// - API URL을 동적으로 생성한다. (`count`와 `lang`을 쿼리 파라미터로 추가)
// - 네트워크 요청을 보낸다 (`fetch` 사용)
// - 요청이 성공하면 JSON 데이터를 반환한다.
// - 요청이 실패하면 에러 메시지를 출력한다.
// - 로딩 표시 (`showLoading`)와 숨기기 (`hideLoading`)를 적절히 적용한다.
async function fetchFacts(count = 1) {
  //  1. 사용자가 선택한 언어(language) 가져오기
  //  2. API 요청 URL 생성!!!! 힌트: const url='$_?_= $_&_=$_'

  try {
    //  3. 로딩 상태 표시
    showLoading();
    // ✅ 4. API 요청을 보내고 응답을 기다림
    // → fetch()를 사용하여 네트워크 요청을 보낸다.

    /* HTTP 상태 코드를 체크하여 응답이 정상인지 확인. →  성공하면  응답을 JSON 형식으로 변환하여 데이터 반환. 
    if 응답 없을 시 에러 발생 메세지 작성 "Failed to fetch cat facts" */

    // 5. JSON 데이터 변환

    // 6. 데이터 return(반환환) (data.data 배열)
  } catch (err) {
    //  7. 에러 발생 시 사용자에게 알림
  } finally {
    // 8. 요청이 끝나면 로딩 상태 숨기기
  }
}

/* #2: 이벤트 리스너 추가 (버튼 클릭 시 API 요청 및 결과 표시)
- 버튼 클릭 시 `fetchFacts()` 호출하여 데이터 가져오기
- 단일 fact는 `displayFacts(facts[0])`을 사용해 표시*/
getFactBtn.addEventListener("click", async () => {
  //  1. API에서 하나의 랜덤한 고양이 사실 가져오기
  //  2. 응답 데이터가 있을 경우, 화면에 표시 (단일 팩트는 문자열로 표시)
});

//   #3: 여러 개의 팩트를 가져오는 버튼 처리
// - 사용자 입력값(`factCount.value`)을 정수로 변환한다.
// - 유효한 값(1~5)인지 확인 후, 아니라면 오류 메시지를 띄운다.
// - `fetchFacts(count)`를 호출해 데이터를 가져온 후 화면에 표시한다.
getMultipleBtn.addEventListener("click", async () => {
  //  1. 입력된 개수 가져오기 (기본값 1) 힌트: parseInt 사용
  //  2. 유효한 개수(1~5)인지 확인 -> 유효하지 않으면 에러 메시지 표시 "Please enter a number between 1 and 5"
  //  3. API 호출하여 여러 개의 팩트 가져오기 (힌트: fetchFacts(count) 사용)
  //  4. 응답 데이터가 있을 경우, 화면에 표시
});

// 페이지 로드시 자동으로 하나의 고양이 사실 가져오기
window.addEventListener("load", () => {
  getFactBtn.click();
});
