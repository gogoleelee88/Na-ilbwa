import React, { useState } from 'react';

function VoiceInput() {
  const [text, setText] = useState('');

  const handleVoiceInput = async () => {
    try {
      const response = await fetch('http://localhost:5000/voice_input', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.text) {
        setText(data.text);
      } else {
        setText('No voice input detected');
      }
    } catch (error) {
      console.error('Error:', error);
      setText('Error occurred while processing voice input');
    }
  };

  return (
    <div>
      <button onClick={handleVoiceInput}>Start Voice Input</button>
      <p>{text}</p>
    </div>
  );
}

export default VoiceInput;
