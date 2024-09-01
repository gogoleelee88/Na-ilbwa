export const CallGPT = async ({ prompt }) => {
  // 시스템 역할과 유저 콘텐츠 내용을 JSON 형식으로 정의
  const messages = [
    {
      role: "system",
      content: `## INFO ##
      You can add images to the reply by URL. Write the image in a JSON field. 
      Use the Unsplash API (https://source.unsplash.com/1600x900/?). The query is just some tags that describe the image. ## DO NOT RESPOND TO INFO BLOCK ##`,
    },
    {
      role: "system",
      content: `You are a meeting summary and report writer who organizes and summarizes meetings in a structured report format. Follow the format below to create the summary.`,
    },
    {
      role: "user",
      content: `1. [회의 기본 정보] : 회의 날짜 및 시간, 회의 장소 또는 화상 회의 링크, 참석자 이름과 직책, 회의 목적 및 주요 안건을 요약합니다.
2. [논의 내용 요약] : 각 안건에 대한 논의 요약, 제안된 아이디어 및 의견, 논의 중에 나온 주요 질문 및 답변, 고객의 요구 사항, 기대치 또는 우려 사항을 기록합니다.
3. [결정 사항] : 회의에서 합의된 주요 결정 사항, 진행하기로 한 작업, 프로젝트 또는 변경 사항을 나열합니다.
4. [할당된 작업 및 책임자] : 각 작업에 대한 담당자 지정, 작업의 구체적인 마감 기한과 목표를 기록합니다.
5. [후속 조치] : 후속 회의 일정 또는 후속 조치를 위한 계획을 작성하고, 추가 자료나 정보가 필요한 경우, 이를 준비할 담당자를 명시합니다.
6. [기타 참고 사항] : 회의 중 나온 추가 자료, 문서, 또는 관련 링크, 추후 논의해야 할 잠재적 문제점을 기록합니다.
7. [다음 회의 일정] : 다음 회의의 잠정 일정과 논의할 주요 안건을 설정합니다.
    
Translate into Korean and use the output in the following JSON format:
{
  "meeting_info": {
    "date_time": "회의 날짜 및 시간",
    "location": "회의 장소 또는 화상 회의 링크",
    "participants": [
      {
        "name": "참석자 이름",
        "position": "직책"
      }
    ],
    "purpose": "회의 목적",
    "agenda": "주요 안건"
  },
  "discussion_summary": [
    {
      "topic": "안건 제목",
      "summary": "각 안건에 대한 논의 요약",
      "ideas_suggestions": "제안된 아이디어 및 의견",
      "questions_answers": "주요 질문 및 답변",
      "client_concerns": "고객의 요구 사항, 기대치 또는 우려 사항"
    }
  ],
  "decisions": [
    {
      "decision": "합의된 주요 결정 사항",
      "action": "진행하기로 한 작업, 프로젝트 또는 변경 사항"
    }
  ],
  "assigned_tasks": [
    {
      "task": "할당된 작업",
      "responsible_person": "담당자",
      "deadline": "마감 기한",
      "goal": "작업 목표"
    }
  ],
  "follow_up": {
    "next_meeting_schedule": "후속 회의 일정",
    "plans_for_follow_up": "후속 조치를 위한 계획",
    "additional_resources": "추가 자료 준비 담당자"
  },
  "additional_notes": {
    "additional_documents": "추가 자료나 문서",
    "potential_issues": "추후 논의해야 할 잠재적 문제점"
  },
  "next_meeting": {
    "date_time": "다음 회의의 잠정 일정",
    "agenda": "논의할 주요 안건"
  }
}

[회의 내용]:`,
    },
    {
      role: "user",
      content: `
        """
        ${prompt}
        """`,
    },
  ];

  console.log(">>CallGPT");

  // GPT API 호출
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GPT_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages, // 키와 밸류가 같아서 키만 사용
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  const responseData = await response.json();
  console.log(">>responseData", responseData);

  const message = responseData.choices[0].message.content; // GPT 응답에서 메시지 내용 추출
  return message; // 결과 반환
};
