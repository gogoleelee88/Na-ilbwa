import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [output, setOutput] = useState([]);

  useEffect(() => {
    let intervalId;

    const startVoiceInput = async () => {
      while (isListening) {
        try {
          const response = await fetch('http://localhost:5000/voice_input', {
            method: 'POST'
          });
          const data = await response.json();
          
          if (data.text) {
            setOutput(prevOutput => [...prevOutput, data.text]);
          }
        } catch (error) {
          console.error('Error:', error);
        }
        
        // 잠시 대기 후 다음 음성 입력 시도
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    };

    if (isListening) {
      startVoiceInput();
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isListening]);

  const handleStart = () => setIsListening(true);
  const handleStop = () => setIsListening(false);

  return (
    <div className="App">
      <h1>음성 입력 일기</h1>
      <button onClick={handleStart}>음성 입력 시작</button>
      <button onClick={handleStop}>음성 입력 중지</button>
      <div id="output">
        {output.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
