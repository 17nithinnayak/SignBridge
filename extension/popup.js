const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const statusDiv = document.getElementById('status');
const transcriptDiv = document.getElementById('transcript');

// Check for browser support
if (!('webkitSpeechRecognition' in window)) {
  statusDiv.textContent = "Error: Speech recognition not supported by this browser.";
  startBtn.disabled = true;
}

const recognition = new webkitSpeechRecognition();
let final_transcript = '';

recognition.continuous = true; // Keep listening
recognition.interimResults = true; // Show results as they come in
recognition.lang = 'en-US';

recognition.onstart = () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  statusDiv.className = 'status recording';
  statusDiv.textContent = "🎤 Listening... (Please keep this popup open)";
};

recognition.onerror = (event) => {
  statusDiv.textContent = 'Error: ' + event.error;
};

recognition.onend = () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  statusDiv.className = 'status disconnected';
  statusDiv.textContent = "○ Ready to start";

  // When listening stops, send the final transcript for translation
  if (final_transcript) {
    statusDiv.textContent = "Sending transcript to backend...";
    chrome.runtime.sendMessage({
      action: "translateText",
      text: final_transcript
    });
    final_transcript = ''; // Clear for next time
  }
};

recognition.onresult = (event) => {
  let interim_transcript = '';
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
  }
  // Update the UI
  transcriptDiv.innerHTML = final_transcript + '<span style="color: #999;">' + interim_transcript + '</span>';
};

startBtn.addEventListener('click', () => {
  final_transcript = ''; // Clear previous text
  transcriptDiv.innerHTML = '';
  recognition.start();
});

stopBtn.addEventListener('click', () => {
  recognition.stop();
});