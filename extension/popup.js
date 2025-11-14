document.getElementById('startBtn').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'START_CAPTURE' }, (resp) => {
    document.getElementById('status').innerText = resp && resp.ok ? 'Capturing tab audio...' : 'Failed: ' + (resp && resp.error);
  });
});

document.getElementById('stopBtn').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'STOP_CAPTURE' }, (resp) => {
    document.getElementById('status').innerText = 'Stopped';
  });
});

// Enqueue a demo video onto the page via content script
document.getElementById('enqueueDemo').addEventListener('click', async () => {
  // Query active tab and post message to content script
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  if (!tab) return;
  // Example demo video URL (same as content.js demo)
  const url = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm';
  chrome.tabs.sendMessage(tab.id, { type: 'ENQUEUE_VIDEO', url }, (resp) => {
    document.getElementById('status').innerText = 'Enqueued demo video';
  });
});



// document.getElementById("startDemo").addEventListener("click", async () => {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   chrome.runtime.sendMessage({ action: "startDemo", tabId: tab.id });
// });
