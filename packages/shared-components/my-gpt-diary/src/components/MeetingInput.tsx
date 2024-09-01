import { Input, Button, message } from 'antd'; // antd의 message를 사용하여 사용자 알림 표시
import { useState, useRef, useEffect } from 'react';

const { TextArea } = Input;

const MeetingInput = ({ isLoading, onSubmit }) => {
  const [userInput, setUserInput] = useState("");
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [noSpeechCount, setNoSpeechCount] = useState(0); // no-speech 오류 횟수를 추적하기 위한 상태
  const MAX_NO_SPEECH_COUNT = 5; // 최대 허용 no-speech 오류 횟수

  // Web Speech API 초기화
  useEffect(() => {
    if (!recognitionRef.current && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false; // 단일 세션으로 설정하여 음성 인식이 종료될 때마다 새로 시작되도록 설정
      recognitionRef.current.lang = 'ko-KR'; // 한국어 인식
      recognitionRef.current.interimResults = false; // 중간 결과 표시하지 않음
    }
  }, []);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    onSubmit(userInput);
  };

  const handleSpeechToText = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  };

  useEffect(() => {
    const recognition = recognitionRef.current;

    if (recognition) {
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(prevInput => prevInput.trim() + ' ' + transcript);

        setNoSpeechCount(0); // 성공적으로 음성 인식 결과가 나오면 no-speech 횟수 초기화

        // 음성 인식이 완료되면 다시 시작
        if (isListening) {
          recognition.stop(); // 인식이 끝난 후에 종료
          setTimeout(() => {
            recognition.start(); // 짧은 지연 후 다시 시작
          }, 50);
        }
      };

      recognition.onerror = (event) => {
        console.error("음성 인식 오류 발생", event);
        if (event.error === 'no-speech') {
          setNoSpeechCount(prevCount => prevCount + 1); // no-speech 오류 횟수 증가

          if (noSpeechCount >= MAX_NO_SPEECH_COUNT) {
            message.error("음성 인식이 작동하지 않습니다. 마이크를 확인해 주세요."); // 사용자에게 알림 표시
            setNoSpeechCount(0); // 오류 카운트를 초기화하여 무한 루프 방지
          }
        }

        // 오류 발생 시 음성 인식을 중지하지 않고 재시작
        if (isListening) {
          recognition.stop();
          setTimeout(() => {
            recognition.start(); // 짧은 지연 후 음성 인식 재시작
          }, 50);
        }
      };

      recognition.onend = () => {
        if (isListening) {
          // 음성 인식이 정상적으로 종료되었을 때만 재시작
          recognition.start();
        }
      };
    }
  }, [isListening, noSpeechCount]);

  return (
    <div>
      <TextArea
        value={userInput}
        onChange={handleUserInput}
        placeholder="회의 내용을 입력합니다."
      />
      <Button loading={isLoading} onClick={handleClick}>
        GPT 회의록을 작성해줘!
      </Button>
      <Button onClick={handleSpeechToText}>
        {isListening ? "음성 입력 중지" : "음성으로 입력하기"}
      </Button>
    </div>
  );
}

export default MeetingInput;
