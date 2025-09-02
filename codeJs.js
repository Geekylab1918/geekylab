const video = document.getElementById('bgVideo');
const soundBtn = document.getElementById('soundBtn');
const soundStatus = document.getElementById('soundStatus');

function updateUI(isMuted) {
  if (!soundBtn) return; 
  soundBtn.textContent = isMuted ? '🔊' : '🔇';
  soundBtn.setAttribute('aria-pressed', String(!isMuted));

}

if (video && soundBtn) {

  video.play().catch(() => {
    const kickstart = () => {
      video.play().finally(() => document.removeEventListener('click', kickstart));
    };
    document.addEventListener('click', kickstart, { once: true });
  });


  soundBtn.addEventListener('click', async () => {
    try {
      if (video.muted) {
        video.muted = false;
        await video.play();
      } else {
        video.muted = true;
      }
    } catch (e) {
      video.muted = true;
      console.warn('Nu s-a putut porni sunetul:', e);
    } finally {
      updateUI(video.muted);
    }
  });

  updateUI(video.muted);
}

