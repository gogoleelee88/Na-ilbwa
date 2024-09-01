import { useState } from 'react';
import { CallGPT } from './api/gpt';
import MeetingInput from './components/MeetingInput';
import styled from 'styled-components';
import logo from './assets/logo.png';
import MeetingDisplay from './components/MeetingDisplay';
import React from 'react';

const dummyData = {
  "meeting_info": {
    "date_time": "2024-08-29 10:00 AM",
    "location": "Zoom 회의 링크",
    "participants": [
      {
        "name": "홍길동",
        "position": "프로젝트 매니저"
      },
      {
        "name": "김철수",
        "position": "개발자"
      }
    ],
    "purpose": "프로젝트 진행 상황 점검",
    "agenda": "프로젝트 목표와 일정 조정"
  },
  "discussion_summary": [
    {
      "topic": "프로젝트 일정 조정",
      "summary": "각 팀의 진행 상황에 따른 일정 재조정 논의",
      "ideas_suggestions": "A팀의 일정 단축 제안, B팀의 인력 추가 요청",
      "questions_answers": "Q: 일정 단축 가능성? A: 불가능",
      "client_concerns": "빠른 일정 요구, 품질 보장 요구"
    }
  ],
  "decisions": [
    {
      "decision": "A팀의 일정 유지",
      "action": "추가 인력 없이 현재 인원으로 진행"
    }
  ],
  "assigned_tasks": [
    {
      "task": "일정 재검토 및 조정",
      "responsible_person": "김철수",
      "deadline": "2024-09-05",
      "goal": "효율적인 일정 관리"
    }
  ],
  "follow_up": {
    "next_meeting_schedule": "2024-09-10",
    "plans_for_follow_up": "추가 인력 검토 필요",
    "additional_resources": "프로젝트 계획서 업데이트"
  },
  "additional_notes": {
    "additional_documents": "회의록 PDF 첨부",
    "potential_issues": "일정 연기 가능성"
  },
  "next_meeting": {
    "date_time": "2024-09-15",
    "agenda": "추가 인력 검토 및 일정 최종 조정"
  }
};

function App() {
  const [data, setData] = useState(dummyData);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickAPICall = async (userInput) => {
    try {
      setIsLoading(true);
      
      const message = await CallGPT({
        prompt: `${userInput}`,
      });
      
      setData(JSON.parse(message));
      
    } catch (error) {
      console.error("Error calling GPT API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (userInput) => {
    handleClickAPICall(userInput);
  };

  const handleDataChange = (updatedData) => {
    setData(updatedData);
  };

  return (
    <AppContainer>
      <AppTitle>
        애자일 AI 회의록 요약
        <img width={"100px"} src={logo} alt="logo"></img>
      </AppTitle>
      
      <MeetingInput isLoading={isLoading} onSubmit={handleSubmit} />
      <MeetingDisplay data={data} onDataChange={handleDataChange} />
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