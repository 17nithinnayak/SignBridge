/* content.js
   Injects floating video player and implements queue + play logic.
*/

/* content.js
   Injects floating video player and implements queue + play logic.
*/

(() => {
  if (window.__SIGNBRIDGE_LOADED) return;
  window.__SIGNBRIDGE_LOADED = true;

  // Create player element
  const videoPlayer = document.createElement('video');
  videoPlayer.id = 'signbridge-player';
  videoPlayer.style.position = 'fixed';
  videoPlayer.style.right = '20px';
  videoPlayer.style.bottom = '20px';
  videoPlayer.style.width = '300px';
  videoPlayer.style.zIndex = '9999999';
  videoPlayer.style.opacity = '0';
  videoPlayer.style.transition = 'opacity 0.3s';
  videoPlayer.style.pointerEvents = 'auto';
  videoPlayer.controls = false;
  videoPlayer.muted = false;
  videoPlayer.preload = 'auto';
  videoPlayer.autoplay = false;
  document.body.appendChild(videoPlayer);

  // Optional: allow dragging the player
  (function makeDraggable(el) {
    let isDown = false, offset = [0,0];
    el.addEventListener('mousedown', (e) => {
      isDown = true;
      offset = [el.offsetLeft - e.clientX, el.offsetTop - e.clientY];
      el.style.cursor = 'grabbing';
    });
    document.addEventListener('mouseup', () => { isDown = false; el.style.cursor='grab'; });
    document.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      el.style.right = 'auto';
      el.style.left = (e.clientX + offset[0]) + 'px';
      el.style.top = (e.clientY + offset[1]) + 'px';
    });
  })(videoPlayer);

  // queue and state
  let videoQueue = [];
  let isPlaying = false;

  // playNextVideo implementation
  async function playNextVideo() {
    if (isPlaying || videoQueue.length === 0) return;
    isPlaying = true;
    const url = videoQueue.shift();
    try {
      videoPlayer.src = url;
      videoPlayer.style.opacity = '1';
      await videoPlayer.play();
    } catch (err) {
      console.warn('SignBridge: play failed', err);
      // fade out on error
      videoPlayer.style.opacity = '0';
      isPlaying = false;
      setTimeout(playNextVideo, 250);
    }
  }

  // ended listener
  videoPlayer.addEventListener('ended', () => {
    videoPlayer.style.opacity = '0';
    isPlaying = false;
    setTimeout(() => {
      videoPlayer.src = '';
      playNextVideo();
    }, 300);
  });

  // simple message listener from background/popup
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'ENQUEUE_VIDEO') {
      videoQueue.push(msg.url);
      playNextVideo();
      sendResponse({ok:true});
    } else if (msg.type === 'CLEAR_QUEUE') {
      videoQueue = [];
      sendResponse({ok:true});
    } else if (msg.type === 'SHOW_PLAYER') {
      videoPlayer.style.opacity = '1';
      sendResponse({ok:true});
    } else if (msg.type === 'HIDE_PLAYER') {
      videoPlayer.style.opacity = '0';
      sendResponse({ok:true});
    }
  });

  // === Temporary: Hardcoded demo .webm urls for frontend dev/test ===
  // Push a couple of public .webm urls to the queue so frontend dev can test.
  // Remove these once backend websocket sends URLs.
  const demoUrls = [
    // Replace with actual public .webm urls you host in master_vocab.json
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    // add another short demo if you want
  ];
  // Only push demo content if localStorage flag not set
  if (!localStorage.getItem('signbridge_demo_pushed')) {
    demoUrls.forEach(u => videoQueue.push(u));
    localStorage.setItem('signbridge_demo_pushed', '1');
    playNextVideo();
  }

  // Optionally, if you want to automatically connect to a WS backend and receive URLs:
  // const socket = new WebSocket('wss://nithins-backend.com/ws/translate');
  // socket.onmessage = (evt) => {
  //   // backend can send plain URL or JSON { type:'video', url: '...' }
  //   try {
  //     const data = JSON.parse(evt.data);
  //     if (data.type === 'video' && data.url) {
  //       videoQueue.push(data.url);
  //       playNextVideo();
  //     }
  //   } catch (e) {
  //     // not json -> treat as url
  //     videoQueue.push(evt.data);
  //     playNextVideo();
  //   }
  // };

})();

// (() => {
//   if (window.__SIGNBRIDGE_LOADED) return;
//   window.__SIGNBRIDGE_LOADED = true;

//   // Create player element
//   const videoPlayer = document.createElement('video');
//   videoPlayer.id = 'signbridge-player';
//   videoPlayer.style.position = 'fixed';
//   videoPlayer.style.right = '20px';
//   videoPlayer.style.bottom = '20px';
//   videoPlayer.style.width = '300px';
//   videoPlayer.style.zIndex = '9999999';
//   videoPlayer.style.opacity = '0';
//   videoPlayer.style.transition = 'opacity 0.3s';
//   videoPlayer.style.pointerEvents = 'auto';
//   videoPlayer.controls = false;
//   videoPlayer.muted = false;
//   videoPlayer.preload = 'auto';
//   videoPlayer.autoplay = false;
//   document.body.appendChild(videoPlayer);

//   // Optional: allow dragging the player
//   (function makeDraggable(el) {
//     let isDown = false, offset = [0,0];
//     el.addEventListener('mousedown', (e) => {
//       isDown = true;
//       offset = [el.offsetLeft - e.clientX, el.offsetTop - e.clientY];
//       el.style.cursor = 'grabbing';
//     });
//     document.addEventListener('mouseup', () => { isDown = false; el.style.cursor='grab'; });
//     document.addEventListener('mousemove', (e) => {
//       if (!isDown) return;
//       el.style.right = 'auto';
//       el.style.left = (e.clientX + offset[0]) + 'px';
//       el.style.top = (e.clientY + offset[1]) + 'px';
//     });
//   })(videoPlayer);

//   // queue and state
//   let videoQueue = [];
//   let isPlaying = false;

//   // playNextVideo implementation
//   async function playNextVideo() {
//     if (isPlaying || videoQueue.length === 0) return;
//     isPlaying = true;
//     const url = videoQueue.shift();
//     try {
//       videoPlayer.src = url;
//       videoPlayer.style.opacity = '1';
//       await videoPlayer.play();
//     } catch (err) {
//       console.warn('SignBridge: play failed', err);
//       // fade out on error
//       videoPlayer.style.opacity = '0';
//       isPlaying = false;
//       setTimeout(playNextVideo, 250);
//     }
//   }

//   // ended listener
//   videoPlayer.addEventListener('ended', () => {
//     videoPlayer.style.opacity = '0';
//     isPlaying = false;
//     setTimeout(() => {
//       videoPlayer.src = '';
//       playNextVideo();
//     }, 300);
//   });

//   // simple message listener from background/popup
//   chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//     if (msg.type === 'ENQUEUE_VIDEO') {
//       videoQueue.push(msg.url);
//       playNextVideo();
//       sendResponse({ok:true});
//     } else if (msg.type === 'CLEAR_QUEUE') {
//       videoQueue = [];
//       sendResponse({ok:true});
//     } else if (msg.type === 'SHOW_PLAYER') {
//       videoPlayer.style.opacity = '1';
//       sendResponse({ok:true});
//     } else if (msg.type === 'HIDE_PLAYER') {
//       videoPlayer.style.opacity = '0';
//       sendResponse({ok:true});
//     }
//   });

//   // === Temporary: Hardcoded demo .webm urls for frontend dev/test ===
//   // Push a couple of public .webm urls to the queue so frontend dev can test.
//   // Remove these once backend websocket sends URLs.
//   const demoUrls = [
//     // Replace with actual public .webm urls you host in master_vocab.json
//     'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
//     // add another short demo if you want
//   ];
//   // Only push demo content if localStorage flag not set
//   if (!localStorage.getItem('signbridge_demo_pushed')) {
//     demoUrls.forEach(u => videoQueue.push(u));
//     localStorage.setItem('signbridge_demo_pushed', '1');
//     playNextVideo();
//   }

//   // Optionally, if you want to automatically connect to a WS backend and receive URLs:
//   const socket = new WebSocket('wss://nithins-backend.com/ws/translate');
//   socket.onmessage = (evt) => {
//     // backend can send plain URL or JSON { type:'video', url: '...' }
//     try {
//       const data = JSON.parse(evt.data);
//       if (data.type === 'video' && data.url) {
//         videoQueue.push(data.url);
//         playNextVideo();
//       }
//     } catch (e) {
//       // not json -> treat as url
//       videoQueue.push(evt.data);
//       playNextVideo();
//     }
//   };

// })();



// (() => {
//   // Avoid duplicate overlays
//   if (document.getElementById("signbridge-demo")) return;

//   const container = document.createElement("div");
//   container.id = "signbridge-demo";
//   Object.assign(container.style, {
//     position: "fixed",
//     bottom: "20px",
//     right: "20px",
//     zIndex: "999999",
//     background: "rgba(0,0,0,0.7)",
//     padding: "10px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
//   });

//   const video = document.createElement("video");
//   video.src = chrome.runtime.getURL("videos/demo.mp4"); // <-- your demo file
//   video.autoplay = true;
//   video.muted = false;
//   video.controls = true;
//   video.style.width = "320px";
//   video.style.borderRadius = "8px";

//   container.appendChild(video);

//   // Add close button
//   const closeBtn = document.createElement("button");
//   closeBtn.textContent = "×";
//   Object.assign(closeBtn.style, {
//     position: "absolute",
//     top: "4px",
//     right: "8px",
//     background: "transparent",
//     border: "none",
//     color: "white",
//     fontSize: "20px",
//     cursor: "pointer"
//   });
//   closeBtn.onclick = () => container.remove();

//   container.appendChild(closeBtn);
//   document.body.appendChild(container);
// })();