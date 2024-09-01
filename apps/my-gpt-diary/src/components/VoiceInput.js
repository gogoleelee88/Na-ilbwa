fetch('http://127.0.0.1:5000/voice_input', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})  // 여기에 필요에 따라 요청 본문을 추가할 수 있습니다.
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
  