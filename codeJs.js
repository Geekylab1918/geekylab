const video = document.getElementById('bgVideo');
const soundBtn = document.getElementById('soundBtn');
const soundStatus = document.getElementById('soundStatus');

function updateUI(isMuted) {
  if (!soundBtn) return; // protecție dacă nu suntem pe index.html
  soundBtn.textContent = isMuted ? '🔊' : '🔇';
  soundBtn.setAttribute('aria-pressed', String(!isMuted));
  //soundStatus.textContent = 'Sunet: ' + (isMuted ? 'OPRIT' : 'PORNIȚ');
}

if (video && soundBtn) {
  // Încearcă să ruleze video
  video.play().catch(() => {
    const kickstart = () => {
      video.play().finally(() => document.removeEventListener('click', kickstart));
    };
    document.addEventListener('click', kickstart, { once: true });
  });

  // Toggle sunet
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
