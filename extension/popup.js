const s2iBtn = document.getElementById('s2iBtn');
const s2iBtnText = document.getElementById('s2iBtn-text');
const i2sBtn = document.getElementById('i2sBtn');
const statusDiv = document.getElementById('status');

// --- 1. Speech-to-ISL (Mic) Logic ---

if (!('webkitSpeechRecognition' in window)) {
  statusDiv.textContent = "Error: Speech recognition not supported.";
  s2iBtn.disabled = true;
}

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

let isRecording = false;

// When recognition starts
recognition.onstart = () => {
  isRecording = true;
  s2iBtn.classList.add('recording');
  s2iBtnText.textContent = 'Stop Listening';
  statusDiv.textContent = "Speech-to-ISL is active";
};

// When recognition gives an error
recognition.onerror = (event) => {
  statusDiv.textContent = 'Speech Error: ' + event.error;
};

// When recognition ends (either by stop() or automatically)
recognition.onend = () => {
  isRecording = false;
  s2iBtn.classList.remove('recording');
  s2iBtnText.textContent = 'Start Listening';
  statusDiv.textContent = "Status: Ready";
};

// When a speech result is received
recognition.onresult = (event) => {
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      let chunk = event.results[i][0].transcript.trim();
      
      if (chunk) {
        // Send finalized chunk to the backend
        console.log('Sending chunk:', chunk);
        chrome.runtime.sendMessage({
          action: "translateText",
          text: chunk
        });
      }
    }
  }
};

// --- Button 1: Start/Stop Toggle ---
s2iBtn.addEventListener('click', () => {
  if (isRecording) {
    recognition.stop();
  } else {
    try {
      recognition.start();
    } catch(e) {
      console.log("Error starting recognition:", e);
    }
  }
});


// --- Button 2: ISL-to-Speech (Webcam) Logic ---
i2sBtn.addEventListener('click', () => {
  statusDiv.textContent = "Starting ISL-to-Speech...";
  
  chrome.runtime.sendMessage({
    action: "startISLToSpeech"
  });
  
  // Close the popup so the user can see the page
  window.close();
});