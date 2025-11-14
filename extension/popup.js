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
  
  // Clear the transcript when starting a new session
  final_transcript = ''; 
  transcriptDiv.innerHTML = '';
};

recognition.onerror = (event) => {
  statusDiv.textContent = 'Error: ' + event.error;
};

recognition.onend = () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  statusDiv.className = 'status disconnected';
  statusDiv.textContent = "○ Ready to start";
  
  // <<< CHANGED >>>
  // We no longer send the transcript here. It's sent in real-time.
};

recognition.onresult = (event) => {
  let interim_transcript = '';
  
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    let chunk = event.results[i][0].transcript;
    
    if (event.results[i].isFinal) {
      final_transcript += chunk + ' '; // Add a space
      
      // <<< CHANGED >>>
      // Send the finalized chunk to the backend IMMEDIATELY
      console.log('Sending chunk to backend:', chunk);
      chrome.runtime.sendMessage({
        action: "translateText",
        text: chunk
      });
      
    } else {
      interim_transcript += chunk;
    }
  }
  
  // Update the UI
  transcriptDiv.innerHTML = final_transcript + '<span style="color: #999;">' + interim_transcript + '</span>';
  transcriptDiv.scrollTop = transcriptDiv.scrollHeight; // Auto-scroll
};

startBtn.addEventListener('click', () => {
  // All logic is now in onstart
  recognition.start();
});

stopBtn.addEventListener('click', () => {
  recognition.stop();
});