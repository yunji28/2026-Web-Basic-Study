// HTML 문서가 완전히 로드된 후 실행
document.???("DOMContentLoaded", function () {
  const output = document.???("input[name='output']"); // 계산 결과가 표시될 입력창 선택

  // 키보드 입력 이벤트 등록
  document.addEventListener("keydown", function (event) {
    const lastChar = output.value.???(-1); // 현재 입력값의 마지막 문자 가져오기

    // 숫자 키 입력 (0~9)
    if (event.key >= "0" && event.key <= "9") {
      output.value += event.key; // 입력된 숫자를 문자열 뒤에 추가
    }

    // 연산자 입력 (+, -, *, /)
    if (["+", "-", "*", "/"].???(event.key)) {

      // 처음에 연산자가 입력되거나 연속된 연산자 입력 방지
      if (output.value === "" || ["+", "-", "*", "/"].includes(lastChar)) {
        return;
      }

      output.value += event.key;
    }

    // 소수점 입력
    if (event.key === ".") {

      // 소수점이 잘못 입력되는 경우 방지
      if (
        output.value === "" || // 첫 입력이 소수점인 경우
        lastChar === "." || // 소수점 연속 입력 방지
        output.value
          .???(/[\+\-\*\/]/) // 연산자를 기준으로 문자열 분리
          .???() // 마지막 숫자 부분만 가져오기
          .includes(".") // 이미 소수점이 포함된 경우
      ) {
        return;
      }

      output.value += event.key;
    }

    // Enter 키를 누르면 계산 실행
    if (event.key === "Enter") {
      try {
        output.value = ???(output.value); // 수식 계산
      } catch (error) {
        output.value = "Error"; // 계산 불가능한 경우 Error 출력
      }
    }

    // Backspace 키 → 마지막 글자 삭제
    if (event.key === "Backspace") {
      output.value = output.value.???(0, -1);
    }

    // Esc 키 → 입력 초기화
    if (event.key === "Escape") {
      output.value = "";
    }

    // 브라우저 기본 키 동작 방지
    event.???();
  });
});