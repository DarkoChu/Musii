const MIN_LOADING_TIME = 2500;
const loadStart = Date.now();

const bootSound = document.getElementById("load-sound");

window.addEventListener("load", () => {
  const screen = document.getElementById("loading-screen");
  if (!screen) return;

  const elapsed = Date.now() - loadStart;
  const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);

  setTimeout(() => {
    if (bootSound) {
      try {
        bootSound.volume = 0.7;
        bootSound.play().catch(() => {});
      } catch (e) {}
    }

    screen.style.animation = 'bgShift 6s ease infinite';
    void screen.offsetWidth;
    screen.classList.add('fade-out');

    function onTransitionEnd(e) {
      if (e && e.propertyName !== 'opacity') return;
      screen.style.display = 'none';
      screen.removeEventListener('transitionend', onTransitionEnd);
    }

    screen.addEventListener('transitionend', onTransitionEnd);

    const FALLBACK_REMOVE_MS = 800;
    setTimeout(() => {
      if (screen.style.display !== 'none') {
        screen.style.display = 'none';
        screen.removeEventListener('transitionend', onTransitionEnd);
      }
    }, FALLBACK_REMOVE_MS);
  }, remaining);
});
