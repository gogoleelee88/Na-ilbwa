import { Input,  Button} from 'antd';
const { TextArea } = Input;
import { useState } from "react";// 저장하는 곳임포트

  const DiaryInput = ({ isLoading, onSubmit }) => {
    const [userInput, setUserInput] = useState("");
  
// isLoading 로딩상태에서 사용하는 변수
// inSubmit 다입력 작성하면 사용


const handleUserInput = (e) => {
  setUserInput(e.target.value);
};

const handleClick = () => {
  onSubmit(userInput);
};

return (
  <div>
    <TextArea
      value={userInput}
      onChange={handleUserInput}
      placeholder="오늘 일어난 일들을 간단히 적어주세요."
    />
    <Button loading={isLoading} onClick={handleClick}>
      GPT 회고록을 작성해줘!
    </Button>
  </div>
);
}
export default DiaryInput;

// import { Input , Button} from 'antd';
// import { useState } from 'react';
// const { TextArea } = Input;

// const DiaryInput = ({isLoading, onSubmit}) => {
//   const [userInput, setUserInput] = useState("");

//   //사용자의 입력을 받아 상위 컴포넌트로 넘기기
//   // 로딩상태에서는 제출버튼 못누루게

//  const handleUserInput =(e)=>{
//   setUserInput(e.target.value);

//   const handleClick = ()=>{
//     onSubmit(userInput);
//   }
//  }

//  return (
//   <div>
//  <TextArea value={userInput} onChange={handleUserInput} placeholder='오늘 하루 회고'/>
//  <Button loading={isLoading} onClick={handleClick}>GPT회고록 시작</Button>
//  </div>
//  );
// };
// export default DiaryInput;