/* content.js
   Injects floating video player and implements queue + play logic.
*/

(() => {
  // Check if player is already injected
  if (document.getElementById('signbridge-player')) return;

  const videoPlayer = document.createElement('video');
  videoPlayer.id = 'signbridge-player';
  videoPlayer.style.position = 'fixed';
  videoPlayer.style.right = '20px';
  videoPlayer.style.bottom = '20px';
  videoPlayer.style.width = '300px';
  videoPlayer.style.zIndex = '9999999';
  videoPlayer.style.opacity = '0'; // Start hidden
  videoPlayer.style.transition = 'opacity 0.3s';
  videoPlayer.style.backgroundColor = 'black';
  videoPlayer.preload = 'auto';
  videoPlayer.autoplay = false;
  videoPlayer.playsInline = true;
  document.body.appendChild(videoPlayer);

  let videoQueue = [];
  let isPlaying = false;

  async function playNextVideo() {
    if (isPlaying || videoQueue.length === 0) return;
    isPlaying = true;
    
    const url = videoQueue.shift();
    console.log("Playing:", url);
    
    try {
      videoPlayer.src = url;
      videoPlayer.style.opacity = '1';
      await videoPlayer.play();
    } catch (err) {
      console.warn('SignBridge: play failed', err);
      videoPlayer.style.opacity = '0';
      isPlaying = false;
      setTimeout(playNextVideo, 250);
    }
  }

  videoPlayer.addEventListener('ended', () => {
    isPlaying = false;
    setTimeout(() => {
      if (videoQueue.length === 0) {
        videoPlayer.style.opacity = '0'; 
      }
      playNextVideo();
    }, 100);
  });
  
  videoPlayer.addEventListener('error', (e) => {
      console.error('SignBridge: Video playback error', e);
      isPlaying = false;
      videoPlayer.style.opacity = '0';
      setTimeout(playNextVideo, 250);
  });

  // Listen for messages from background.js
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'ENQUEUE_VIDEO') {
      videoQueue.push(msg.url);
      playNextVideo();
      sendResponse({ ok: true });
    }
  });

})();