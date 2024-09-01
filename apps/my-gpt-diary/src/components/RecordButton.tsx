// App.js
import React, { useState, useEffect } from 'react';

// 웹킷 엔진 기반의 SpeechRecognition 객체 설정
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceToTextApp = () => {
  const [isListening, setIsListening] = useState(false); // 음성 인식 상태
  const [transcript, setTranscript] = useState(''); // 인식된 텍스트
  const recognitionRef = React.useRef(null); // SpeechRecognition 객체를 useRef로 관리

  useEffect(() => {
    if (SpeechRecognition) {
      // SpeechRecognition 인스턴스 생성 및 설정
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true; // 지속적인 음성 인식 설정
      recognitionRef.current.interimResults = true; // 중간 결과를 받도록 설정
      recognitionRef.current.lang = 'ko-KR'; // 한국어 인식 설정

      recognitionRef.current.onresult = (event) => {
        const lastResult = event.results[event.results.length - 1];
        const transcriptResult = lastResult[0].transcript;
        setTranscript((prev) => prev + ' ' + transcriptResult); // 인식된 텍스트 업데이트
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          // 음성 인식이 중단되었지만, 여전히 듣고 있어야 할 경우 재시작
          recognitionRef.current.start();
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('음성 인식 오류:', event.error);
        if (event.error === 'no-speech' && isListening) {
          // 음성이 감지되지 않은 경우 재시작
          recognitionRef.current.start();
        }
      };
    } else {
      console.error('이 브라우저는 음성 인식을 지원하지 않습니다.');
    }

    // 컴포넌트 언마운트 시 인스턴스 제거
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onresult = null;
      }
    };
  }, [isListening]);

  const handleStartListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div>
      <h1>음성 인식 예제</h1>
      <button onClick={handleStartListening} disabled={isListening}>
        음성 입력 시작
      </button>
      <button onClick={handleStopListening} disabled={!isListening}>
        음성 입력 중지
      </button>
      <div>
        <h2>인식된 텍스트:</h2>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default VoiceToTextApp;
