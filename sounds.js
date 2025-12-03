// sounds.js
// Unified, cleaned-up hover + click SFX for your HTML
// Place this file next to your HTML and ensure the audio paths are correct.

// --- CONFIG: change these if your files live elsewhere ---
const HOVER_SRC = 'sfx/Switch/Nock.wav';   // example path you used
const CLICK_SRC = 'sfx/Switch/Enter & Back.wav';   // you can supply a different file

// --- Create audio objects (preload) ---
function createAudio(src, vol = 1) {
  const a = new Audio(src);
  a.preload = 'auto';
  a.volume = vol;
  a.crossOrigin = 'anonymous';
  return a;
}

const hoverSound = createAudio(HOVER_SRC, 1);
const clickSound = createAudio(CLICK_SRC, 1);

// --- small helper to attempt play and silently ignore promise rejections ---
function tryPlay(audio) {
  if (!audio) return;
  audio.currentTime = 0;
  const p = audio.play();
  if (p && typeof p.catch === 'function') p.catch(() => {
    // autoplay blocked — will be unlocked on first user gesture
  });
}

// --- Unlock audio on first user gesture (important for many browsers) ---
function unlockAudioOnFirstGesture() {
  function unlock() {
    tryPlay(clickSound); // a short sound to "unlock" audio playback
    // remove event
    window.removeEventListener('pointerdown', unlock);
  }
  window.addEventListener('pointerdown', unlock, { once: true, passive: true });
}

function playLoud(sound) {
    sound.currentTime = 0;
    sound.play();

    // Clone & play for louder effect
    const clone = sound.cloneNode();
    clone.volume = sound.volume;
    clone.play();
}

// --- Bind sounds to elements (safe event choices) ---
function addSoundEffects() {
  // Ensure DOM exists
  // Sidebar buttons
  const sideButtons = document.querySelectorAll('.side-btn');
  sideButtons.forEach(btn => {
    // use pointerenter for hover-like effect (works for touch and mouse)
    btn.addEventListener('pointerenter', () => tryPlay(hoverSound));
    // click for click
    btn.addEventListener('pointerdown', () => tryPlay(clickSound));
  });

  // Topbar pills
//   const leftPill = document.querySelector('.topbar-left');
//   const rightPill = document.querySelector('.topbar-right');
//   [leftPill, rightPill].forEach(el => {
//     if (!el) return;
//     el.addEventListener('pointerenter', () => tryPlay(hoverSound));
//     el.addEventListener('pointerdown', () => tryPlay(clickSound));
//   });

  // Optional: attach to any element with data-sound="hover" / data-sound="click"
  const hoverElems = document.querySelectorAll('[data-sound="hover"]');
  hoverElems.forEach(el => el.addEventListener('pointerenter', () => tryPlay(hoverSound)));
  const clickElems = document.querySelectorAll('[data-sound="click"]');
  clickElems.forEach(el => el.addEventListener('pointerdown', () => tryPlay(clickSound)));
}

// --- Initialize on DOM ready ---
window.addEventListener('DOMContentLoaded', () => {
  addSoundEffects();
  unlockAudioOnFirstGesture();
  console.info('[sounds.js] sound bindings initialized');
});
