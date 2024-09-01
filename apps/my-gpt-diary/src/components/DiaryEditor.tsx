// DiaryEditor.tsx
import React, { useState, useCallback } from 'react';
import RecordButton from './RecordButton';

const DiaryEditor: React.FC = () => {
  const [content, setContent] = useState('');

  // 음성으로 인식된 텍스트를 content 상태에 공백으로 구분하여 추가
  const handleTranscriptChange = useCallback((transcript: string) => {
    setContent((prevContent) => prevContent + (prevContent ? ' ' : '') + transcript);
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    // 일기 저장 로직 구현
    console.log('Diary saved:', content);
    setContent('');
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="일기를 입력하세요..."
        rows={10}
        cols={50}
      />
      <RecordButton onTranscriptChange={handleTranscriptChange} />
      <button onClick={handleSubmit}>저장</button>
    </div>
  );
};

export default DiaryEditor;
