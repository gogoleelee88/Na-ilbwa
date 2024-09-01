from flask import Flask, jsonify, request
from flask_cors import CORS
from speech_recognition import Recognizer, Microphone
import pyperclip
import keyboard
import time

app = Flask(__name__)
CORS(app)

def read_voice():
    r = Recognizer()
    mic = Microphone()
    
    with mic as source:
        print("Listening...")
        r.adjust_for_ambient_noise(source)
        audio = r.listen(source)
    
    try:
        voice_data = r.recognize_google(audio, language='ko')
        return voice_data
    except Exception as e:
        print(f"Error recognizing voice: {str(e)}")
        return ""

@app.route('/voice_input', methods=['GET'])
def voice_input():
    voice = read_voice()
    if voice:
        return jsonify({"text": voice}), 200
    else:
        return jsonify({"error": "No voice input detected"}), 400

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/')
def home():
    return "Welcome to the Voice Input API"
@app.route('/another')
def another():
    return "This is another route"



import requests

response = requests.get('http://127.0.0.1:5000/voice_input')
data = response.json()
    # Process your data here
