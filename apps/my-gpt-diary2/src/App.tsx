import { useState } from 'react';
import { CallGPT } from './api/gpt';
import DiaryInput from './components/DiaryInput';
import styled from 'styled-components';
import logo from './assets/logo.png';
import DiaryDisplay from './components/DiaryDisplay';

const dummyData = {
  "title": "고립된 개발자의 고민",
  "thumbnail": "https://source.unsplash.com/1600x900/?programming",
  "summary": "혼자 코딩과제를 진행하면서 걱정이다.",
  "emotional_content": "최근 혼자 코딩과제를 진행하면서, 협업이 없이 모든 것을 혼자 결정하고 해결해야 한다는 부담감에 많이 무겁습니다. 강의를 듣고 최선을 다해 프로젝트를 진행했지만, 예상치 못한 버그들로 인해 스트레스가 많이 쌓였습니다. 스택오버플로와 GPT를 통해 문제를 해결하긴 했지만, 이러한 문제해결 방식이 정말로 제 개발 실력을 향상시키는지에 대해 의문이 듭니다. 왠지 스스로의 능력을 시험할 기회를 잃은 것 같아 아쉽고, 불안감도 커지고 있습니다.",
  "emotional_result": "이 일기에서 감지되는 감정은 불안, 부담감, 그리고 자신감의 결여입니다. 고립된 상황에서의 성공에 대한 압박감과 문제 해결 방법에 대한 의심은 정서적으로 큰 부담을 주고 있습니다. 자기 효능감이 낮아짐을 느끼는 상황입니다.",
  "analysis": "고립되어 문제를 해결하는 과정은 큰 스트레스와 불안을 유발할 수 있습니다. '혼자서 하는 일은 좋은 일이든 나쁜 일이든 더욱 크게 느껴진다'는 에릭 에릭슨의 말처럼, 혼자서 모든 것을 해결하려는 시도는 때로는 개인의 성장에 도움이 될 수 있지만, 지속적인 고립은 자기 효능감을 저하시킬 수 있습니다. 이러한 상황에서는 자신의 노력을 인정하고, 필요한 경우 도움을 요청하는 것이 중요합니다.",
  "action_list": [
    "프로젝트 중 발생하는 문제를 혼자 해결하려 하지 말고, 멘토나 동료 개발자와 상의를 통해 해결 방안을 모색하라.",
    "정기적으로 자신의 학습 방법과 진행 상황을 평가하여, 필요한 경우 학습 방식을 조정하라.",
    "개발 과정에서의 스트레스 관리를 위해 적절한 휴식과 여가 활동을 통해 정서적 안정을 찾으라."
  ]
};


function App() {
  const [data, setData] = useState(dummyData);
  // 우선 빈문자열로 해놓고
  const [isLoading, setIsLoading] = useState(false);

  const handleClickAPICall = async (userInput) => {
      try {
          setIsLoading(true);// 처음에는 로딩을 트루
          
          const message = await CallGPT({
              prompt: `${userInput}`,
          });
            
           // Assuming callGPT is a function that fetches data from GPT API
          setData(JSON.parse(message)); 
        
      } catch (error) {
          // Handle error (you might want to set some error state here)
      } finally {
          setIsLoading(false);//다음에는 펄스로
      }
  };
  

  const handleSubmit = (userInput) => {
    handleClickAPICall(userInput);
  };
  
  console.log(">>data", data);

  return (
      <AppContainer>
        <AppTitle>
          애자일 AI심리상담 회고록
          <img width={"100px"} src={logo}></img>
        </AppTitle>
        
        <DiaryInput isLoading={isLoading} onSubmit={handleSubmit} />
        <DiaryDisplay/>
        {/* <button onClick={handleClickAPICall}>GPT API call</button> */}
        <div>title : {data?.title}</div>
        <div>thumbnail : {data?.thumbnail}</div>
        <div>analysis : {data?.analysis}</div>
        <div>emotional_content : {data?.emotional_content}</div>
        <div>emotional_result : {data?.emotional_result}</div>
        <div>action_list : {data?.action_list}</div>
      </AppContainer>
  );
}
export default App;

const AppContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
`;
const AppTitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 20px;

  img {
    margin-left: 10px;
  }
`;


// import { useState } from "react";
// import { CallGPT } from "./api/gpt";
// import { message } from "antd";
// import DiaryInput from "./components/DiaryInput";

// const dumyData = JSON.parse(`
//   {
//     "title": "당황스러운 예제 에러",
//     "thumbnail": "https://source.unsplash.com/1600x900/?confused",
//     "summary": "가끔 예제 에러가 발생하여 당황함",
//     "emotional_content": "가끔 예제 에러가 나타나는 것이 정말 당황스럽다. 이런 상황들은 예상치 못한 문제로 인해 나를 혼란스럽게 만든다. 그럼에도 불구하고, 이런 에러들은 동시에 나의 문제 해결 능력을 시험한다.",
//     "emotional_result": "당황스러움과 혼란스러움이 느껴진다. 그러나 이는 예상치 못한 문제에 대처하는 능력을 향상시키는 과정일 수 있다.",
//     "analysis": "당신의 당황함과 혼란스러움은 예상치 못한 상황에 대한 불안감과 두려움을 반영할 수 있습니다. 하지만, '문제는 기회다'라는 유명한 격언을 기억하십시오. 이러한 에러들은 당신의 문제 해결 능력을 향상시키는 좋은 기회일 수 있습니다.",
//     "action_list": [
//       "예상치 못한 에러에 대비하는 습관 만들기",
//       "문제 해결 능력 향상을 위한 자기계발",
//       "당황하지 않고 차분하게 상황을 평가하는 능력 기르기"
//     ]
//   }
//   `);
  


<DiaryDisplay />
// function App() {

// const [data, setData] = useState(dumyData);
// const [isLoading, setIsLoading] = useState(false);
// //      여기로딩상태가
// const handleClickAPICall = async (userInput) => {

//   try{// try catch로 감싸서, 처음에는 로딩상태를 트루라고 하고 
//     setIsLoading(true);
//   const message = await CallGPT({
//     prompt:'{userInput}',
//   });
//   setData(JSON.parse(message));// 그리고 데이터가 잘오면 받아보자

//   } catch (error){

//   }finally{
//     setIsLoading(false);// 나중에는 false라고 하자
//   }
// };
//   const handleSubmit = (userInput)=>{
//     handleClickAPICall(userInput);


//   };
//   console.log(">>data", data);

//   return (
//     <>
//     <DiaryInput isLoading={isLoading} onSubmit={handleSubmit} />
// // 여기로 옴
//       <button onClick={handleClickAPICall}>GPT API call</button>
//       <div>data : {data?.title}</div>
//       <div>thumbnail: {data?.thumbnail}</div>
//       <div>summary : {data?.summary}</div>
//       <div>emotional_resul : {data?.emotional_resul}</div>
//       <div>emotional_content : {data?.emotional_content}</div>
//       <div>analysis: {data?.analysis}</div>
//       <div>action_list: {data?.action_list}</div>
//     </>
//   );
// }

// export default App;
