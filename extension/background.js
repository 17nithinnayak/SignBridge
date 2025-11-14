// background.js

const BACKEND_HTTP_URL = "https.signbridgebackend-g6zh.onrender.com/api/translate-text";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "translateText") {
    translateText(message.text);
    return true; // Indicate async response
  }
});

async function translateText(textToTranslate) {
  console.log("Translating text:", textToTranslate);

  try {
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

    if (data.urls && data.urls.length > 0) {
      // Find the active tab and send it the URLs
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab) {
        // Inject content.js if it's not already there
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"]
        });
        
        // Send each URL to the content script
        for (const url of data.urls) {
          chrome.tabs.sendMessage(tab.id, {
            type: 'ENQUEUE_VIDEO',
            url: url
          });
        }
      }
    }
  } catch (e) {
    console.error("Translation failed:", e);
  }
}