import React, { useState } from 'react'; // React 및 useState 훅을 임포트

// App 컴포넌트 정의
function Counter() {
  // count 상태 변수와 그 상태를 변경하는 setCount 함수 선언 (초기값은 0)
  const [count, setCount] = useState(0);

  // userInput 상태 변수와 그 상태를 변경하는 setUserInput 함수 선언 (초기값은 빈 문자열)
  const [userInput, setUserInput] = useState("");

  // + 버튼 클릭 시 호출되는 함수, count를 1 증가시킴
  const handleClickPlus = () => {
    setCount(count + 1);
  };

  // - 버튼 클릭 시 호출되는 함수, count를 1 감소시킴
  const handleClickMinus = () => {
    setCount(count - 1);
  };

  // 입력 필드의 값이 변경될 때 호출되는 함수, 입력된 값을 userInput 상태에 저장
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // 입력 필드에서 Enter 키를 눌렀을 때 호출되는 함수
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { // Enter 키가 눌렸을 때
      setUserInput(""); // 입력 필드를 초기화
      const num = Number(userInput); // userInput의 값을 숫자로 변환
      if (Number.isInteger(num)) setCount(num); // 정수일 경우 count를 해당 값으로 설정
    }
  };

  // 컴포넌트의 UI를 반환
  return (
    <>
      {/* 현재 카운트를 표시하는 영역 */}
      <div>current count: {count}</div>

      {/* 사용자로부터 입력을 받는 필드 */}
      <div>
        <div>count value input:</div>
        <input
          value={userInput} // 입력 필드의 현재 값을 userInput 상태와 동기화
          onChange={handleUserInput} // 값 변경 시 handleUserInput 함수 호출
          onKeyDown={handleEnter} // 키 입력 시 handleEnter 함수 호출
        />
      </div>

      {/* 카운트를 증가/감소시키는 버튼들 */}
      <div>buttons:</div>
      <button onClick={handleClickPlus}>+</button> {/* + 버튼 클릭 시 handleClickPlus 호출 */}
      <button onClick={handleClickMinus}>-</button> {/* - 버튼 클릭 시 handleClickMinus 호출 */}
    </>
  );
}

export default Counter; // App 컴포넌트를 모듈의 기본 내보내기로 설정
