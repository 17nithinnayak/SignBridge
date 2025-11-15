// No more importScripts('axios.min.js')

const BACKEND_HTTP_URL = "https://signbridgebackend-g6zh.onrender.com/api/translate-text";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  // --- Feature 1: Speech-to-ISL (Mic) ---
  if (message.action === "translateText") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        translateText(message.text, tabs[0].id);
      }
    });
    return true; // Keep message port open for async response
  }
  
  // --- Feature 2: ISL-to-Speech (Webcam) ---
  if (message.action === "startISLToSpeech") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        startISLToSpeech(tabs[0].id);
      }
    });
    return true;
  }
  
  // --- Helper for Feature 2 ---
  if (message.action === "speakText") {
    chrome.tts.speak(message.text, { 'rate': 0.9 });
    return true;
  }
});


// --- Feature 1: Speech-to-ISL Function (using fetch) ---
async function translateText(textToTranslate, tabId) {
  console.log("Translating text:", textToTranslate);

  try {
    // --- This is the new fetch() code ---
    const response = await fetch(BACKEND_HTTP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: textToTranslate })
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const data = await response.json(); // Expects {"urls": ["url1", "url2"]}
    // --- End of fetch() code ---

    if (data.urls && data.urls.length > 0) {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content.js"]
      });
      
      for (const url of data.urls) {
        chrome.tabs.sendMessage(tabId, {
          type: 'ENQUEUE_VIDEO',
          url: url
        });
      }
    }
  } catch (e) {
    console.error("Translation (S2ISL) failed:", e);
  }
}

// --- Feature 2: ISL-to-Speech Function ---
async function startISLToSpeech(tabId) {
  console.log("Activating ISL-to-Speech on tab:", tabId);
  
  await chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ["content.js"]
  });
  
  chrome.tabs.sendMessage(tabId, {
    type: 'ACTIVATE_WEBCAM'
  });
}