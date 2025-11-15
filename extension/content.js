/* content.js
   Handles BOTH the ISL video player AND the ISL-to-Speech webcam
*/

(() => {
  // Ensure this script only runs once per page
  if (window.isl_translator_loaded) return;
  window.isl_translator_loaded = true;

  
  // --- Feature 1: Speech-to-ISL Video Player ---
  
  let videoPlayer = document.getElementById('signbridge-player');
  if (!videoPlayer) {
    videoPlayer = document.createElement('video');
    videoPlayer.id = 'signbridge-player';
    videoPlayer.style.position = 'fixed';
    videoPlayer.style.right = '20px';
    videoPlayer.style.bottom = '20px';
    videoPlayer.style.width = '300px';
    videoPlayer.style.zIndex = '9999999';
    videoPlayer.style.opacity = '0'; // Start hidden
    
    // --- SETS THE FADE DURATION ---
    videoPlayer.style.transition = 'opacity 0.3s ease'; 
    
    videoPlayer.style.backgroundColor = 'black';
    videoPlayer.style.cursor = 'grab'; // For dragging
    videoPlayer.preload = 'auto';
    videoPlayer.autoplay = false;
    videoPlayer.playsInline = true;
    document.body.appendChild(videoPlayer);

    // Make the player draggable
    makeDraggable(videoPlayer);
  }

  let videoQueue = [];
  let isPlaying = false;
  const FADE_TIME = 300; // Must match the CSS transition time

  async function playNextVideo() {
    if (isPlaying || videoQueue.length === 0) return;
    isPlaying = true;
    
    const url = videoQueue.shift();
    console.log("Playing:", url);
    
    try {
      videoPlayer.src = url;
      // --- FADE IN ---
      videoPlayer.style.opacity = '1'; 
      await videoPlayer.play();
    } catch (err) {
      console.warn('SignBridge: play failed', err);
      // --- FADE OUT on error ---
      videoPlayer.style.opacity = '0'; 
      isPlaying = false;
      setTimeout(playNextVideo, FADE_TIME);
    }
  }

  // --- MODIFIED for smooth fade-out ---
  videoPlayer.addEventListener('ended', () => {
    isPlaying = false;
    videoPlayer.style.opacity = '0'; // Start fading out
    
    setTimeout(() => {
      playNextVideo(); // Check for next video AFTER fade-out
    }, FADE_TIME);
  });
  
  // --- MODIFIED for smooth fade-out ---
  videoPlayer.addEventListener('error', (e) => {
    console.error('SignBridge: Video playback error', e);
    isPlaying = false;
    videoPlayer.style.opacity = '0'; // Start fading out
    
    setTimeout(() => {
      playNextVideo(); // Try next video AFTER fade-out
    }, FADE_TIME);
  });
  

  // --- Feature 2: ISL-to-Speech Webcam (Placeholder) ---
  
  async function activateWebcam() {
    alert("Activating ISL-to-Speech (Placeholder)\n\nThis would access your webcam and run the AI model.");
    
    const dummyTextResult = "ISL to speech is not yet implemented. This is a placeholder.";
    
    chrome.runtime.sendMessage({
      action: "speakText",
      text: dummyTextResult
    });
  }
  

  // --- Message Listener (Handles messages for BOTH features) ---
  
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    
    if (msg.type === 'ENQUEUE_VIDEO') {
      videoQueue.push(msg.url);
      playNextVideo();
      sendResponse({ ok: true });
    }
    
    if (msg.type === 'ACTIVATE_WEBCAM') {
      activateWebcam();
      sendResponse({ ok: true });
    }
  });
  
  
  // --- Draggable Function ---
  function makeDraggable(el) {
    let isDown = false, offset = [0, 0];
    
    el.addEventListener('mousedown', (e) => {
      isDown = true;
      offset = [
        el.getBoundingClientRect().left - e.clientX,
        el.getBoundingClientRect().top - e.clientY
      ];
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
    }, true);
    
    document.addEventListener('mouseup', () => {
      isDown = false;
      if (el) {
          el.style.cursor = 'grab';
          el.style.userSelect = 'auto';
      }
    }, true);
    
    document.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      
      let newTop = (e.clientY + offset[1]);
      let newLeft = (e.clientX + offset[0]);

      // Constrain to viewport
      const doc = document.documentElement;
      newTop = Math.max(0, Math.min(newTop, doc.clientHeight - el.offsetHeight));
      newLeft = Math.max(0, Math.min(newLeft, doc.clientWidth - el.offsetWidth));
      
      el.style.right = 'auto'; 
      el.style.bottom = 'auto';
      el.style.left = newLeft + 'px';
      el.style.top = newTop + 'px';
    }, true);
  }

})();