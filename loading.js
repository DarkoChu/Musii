// Improved loading.js — robust fade-out across browsers

// Minimum guaranteed loading time (ms)
const MIN_LOADING_TIME = 1000;
const loadStart = Date.now();

// Optional boot sound element (may not exist)
const bootSound = document.getElementById("load-sound");

window.addEventListener("load", () => {
  const screen = document.getElementById("loading-screen");
  if (!screen) return;

  const elapsed = Date.now() - loadStart;
  const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);

  setTimeout(() => {
    // Play boot sound (if present). Don't block if play() is rejected.
    if (bootSound) {
      try {
        bootSound.volume = 0.7;
        bootSound.play().catch(() => {});
      } catch (e) {}
    }

    // --- IMPORTANT: Make fade-out reliable ---
    // Some browsers treat an active animation as owning the 'opacity' property,
    // preventing CSS transitions from animating opacity. To avoid that we:
    // 1) Keep the looping background animation (bgShift).
    // 2) Cancel any one-shot 'fadeIn' animation that might still be considered active.
    // 3) Force a reflow so the browser acknowledges the animation change.
    // 4) Add the .fade-out class which uses a transition on opacity.

    // Build the desired animation string — keep bgShift running, remove fadeIn
    // (this matches the CSS keyframe name for the background movement).
    // If your CSS uses a different bg animation name, change 'bgShift' here.
    screen.style.animation = 'bgShift 6s ease infinite';

    // Force reflow so the browser applies the new animation state immediately
    // (this makes sure the upcoming transition isn't blocked).
    void screen.offsetWidth;

    // Now add the fade-out class which only sets opacity: 0 (CSS handles the transition)
    screen.classList.add('fade-out');

    // Clean-up: wait for the transition to finish, then remove the element from flow
    function onTransitionEnd(e) {
      if (e && e.propertyName !== 'opacity') return;
      screen.style.display = 'none';
      screen.removeEventListener('transitionend', onTransitionEnd);
    }

    screen.addEventListener('transitionend', onTransitionEnd);

    // Fallback: if transitionend doesn't fire, forcibly remove after a safe delay
    const FALLBACK_REMOVE_MS = 800; // should be >= CSS transition duration (0.55s)
    setTimeout(() => {
      if (screen.style.display !== 'none') {
        screen.style.display = 'none';
        screen.removeEventListener('transitionend', onTransitionEnd);
      }
    }, FALLBACK_REMOVE_MS);

  }, remaining);
});
