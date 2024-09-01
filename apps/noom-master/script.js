let isListening = false;

async function startVoiceInput() {
  const outputDiv = document.getElementById('output');
    
  while (isListening) {
      try {
          const response = await fetch('http://localhost:5000/voice_input', {
              method: 'POST'
          });
          const data = await response.json();
            
          if (data.text) {
              outputDiv.innerHTML += data.text + '<br>';
          }
      } catch (error) {
          console.error('Error:', error);
      }
        
      // 잠시 대기 후 다음 음성 입력 시도
      await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

document.getElementById('startButton').addEventListener('click', () => {
  isListening = true;
  startVoiceInput();
});

document.getElementById('stopButton').addEventListener('click', () => {
  isListening = false;
});
