// background.js (service worker)
let mediaRecorder = null;
let socket = null;
let captureStream = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'START_CAPTURE') {
    startCapture(sendResponse);
    // return true to indicate async response
    return true;
  } else if (msg.type === 'STOP_CAPTURE') {
    stopCapture();
    sendResponse({ok:true});
  }
});

async function startCapture(sendResponse) {
  try {
    // Start tab audio capture
    chrome.tabCapture.capture({audio: true, video: false}, (stream) => {
      if (!stream) {
        sendResponse({ok:false, error: 'tabCapture failed: ' + chrome.runtime.lastError});
        return;
      }
      captureStream = stream;

      // create MediaRecorder (audio/webm)
      try {
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      } catch (e) {
        console.error('MediaRecorder creation failed', e);
        sendResponse({ok:false, error: e.toString()});
        return;
      }

      // Ensure websocket connection to backend
      // Replace with your backend WS URL
      socket = new WebSocket('wss://nithins-backend.com/ws/translate');

      socket.onopen = () => {
        console.log('Socket open');
        mediaRecorder.start(1000); // emit dataavailable every 1000ms
        sendResponse({ok:true});
      };

      socket.onerror = (err) => {
        console.error('Socket error', err);
      };

      mediaRecorder.ondataavailable = (e) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
          // send raw blob - backend must handle binary
          socket.send(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        if (stream) {
          // stop tracks
          stream.getTracks().forEach(t => t.stop());
        }
      };

    });
  } catch (err) {
    console.error(err);
    sendResponse({ok:false, error: err.toString()});
  }
}

function stopCapture() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
  if (captureStream) {
    captureStream.getTracks().forEach(t => t.stop());
    captureStream = null;
  }
  if (socket) {
    try { socket.close(); } catch(e) {}
    socket = null;
  }
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ SignBridge Extension Installed");
});



// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   if (msg.action === "startDemo") {
//     chrome.scripting.executeScript({
//       target: { tabId: sender.tab.id },
//       files: ["content.js"]
//     });
//     sendResponse({ started: true });
//   }
// });

