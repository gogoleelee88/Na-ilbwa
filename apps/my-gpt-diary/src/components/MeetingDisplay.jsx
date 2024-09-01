import React from 'react';
import styled from 'styled-components';

const MeetingDisplay = ({ data, onDataChange }) => {
  const handleInputChange = (section, key, value, index) => {
    onDataChange({
      ...data,
      [section]: data[section].map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      ),
    });
  };

  const handleSingleInputChange = (section, key, value) => {
    onDataChange({
      ...data,
      [section]: { ...data[section], [key]: value },
    });
  };

  return (
    <DisplayContainer>
      <Section>
        <SectionTitle>회의 정보</SectionTitle>
        <p><strong>일시:</strong> {data.meeting_info.date_time}</p>
        <p><strong>장소:</strong> {data.meeting_info.location}</p>
        <p><strong>참석자:</strong></p>
        <ul>
          {data.meeting_info.participants.map((participant, index) => (
            <li key={index}>
              {participant.name} - {participant.position}
            </li>
          ))}
        </ul>
        <p><strong>목적:</strong> {data.meeting_info.purpose}</p>
        <p><strong>의제:</strong> {data.meeting_info.agenda}</p>
      </Section>
      
      <Section>
        <SectionTitle>논의 내용 요약</SectionTitle>
        {data.discussion_summary.map((summary, index) => (
          <div key={index}>
            <p><strong>주제:</strong> {summary.topic}</p>
            <p><strong>요약:</strong> {summary.summary}</p>
            <p><strong>아이디어 및 제안:</strong> {summary.ideas_suggestions}</p>
            <p><strong>질문 및 답변:</strong> {summary.questions_answers}</p>
            <p><strong>클라이언트 우려사항:</strong> {summary.client_concerns}</p>
          </div>
        ))}
      </Section>

      <Section>
        <SectionTitle>결정 사항</SectionTitle>
        {data.decisions.map((decision, index) => (
          <div key={index}>
            <p><strong>결정:</strong> {decision.decision}</p>
            <p><strong>행동:</strong> {decision.action}</p>
          </div>
        ))}
      </Section>

      <Section>
        <SectionTitle>할당된 작업 및 책임자</SectionTitle>
        {data.assigned_tasks.map((task, index) => (
          <div key={index}>
            <p><strong>작업:</strong> {task.task}</p>
            <p><strong>책임자:</strong> {task.responsible_person}</p>
            <p><strong>마감일:</strong> {task.deadline}</p>
            <p><strong>목표:</strong> {task.goal}</p>
          </div>
        ))}
      </Section>

      <Section>
        <SectionTitle>후속 조치</SectionTitle>
        <p><strong>다음 회의 일정:</strong> {data.follow_up.next_meeting_schedule}</p>
        <p><strong>후속 계획:</strong> {data.follow_up.plans_for_follow_up}</p>
        <p><strong>추가 자료:</strong> {data.follow_up.additional_resources}</p>
      </Section>

      <Section>
        <SectionTitle>기타 참고 사항</SectionTitle>
        <p><strong>추가 문서:</strong> {data.additional_notes.additional_documents}</p>
        <p><strong>잠재적 문제:</strong> {data.additional_notes.potential_issues}</p>
      </Section>

      <Section>
        <SectionTitle>다음 회의 일정</SectionTitle>
        <p><strong>일시:</strong> {data.next_meeting.date_time}</p>
        <p><strong>의제:</strong> {data.next_meeting.agenda}</p>
      </Section>
    </DisplayContainer>
  );
};

const DisplayContainer = styled.div`
  margin-top: 20px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

export default MeetingDisplay;