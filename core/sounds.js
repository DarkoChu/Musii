const HOVER_SRC = 'assets/sfx/Switch/Nock.wav';
const CLICK_SRC = 'assets/sfx/Switch/Enter & Back.wav';

function createAudio(src, vol = 1) {
  const a = new Audio(src);
  a.preload = 'auto';
  a.volume = vol;
  a.crossOrigin = 'anonymous';
  return a;
}

const hoverSound = createAudio(HOVER_SRC, 1);
const clickSound = createAudio(CLICK_SRC, 1);

function tryPlay(audio) {
  if (!audio) return;
  audio.currentTime = 0;
  const p = audio.play();
  if (p && typeof p.catch === 'function') p.catch(() => {});
}

function unlockAudioOnFirstGesture() {
  function unlock() {
    tryPlay(clickSound);
    window.removeEventListener('pointerdown', unlock);
  }
  window.addEventListener('pointerdown', unlock, { once: true, passive: true });
}

function playLoud(sound) {
  sound.currentTime = 0;
  sound.play();
  const clone = sound.cloneNode();
  clone.volume = sound.volume;
  clone.play();
}

function addSoundEffects() {
  const sideButtons = document.querySelectorAll('.side-btn');
  sideButtons.forEach(btn => {
    btn.addEventListener('pointerenter', () => tryPlay(hoverSound));
    btn.addEventListener('pointerdown', () => tryPlay(clickSound));
  });

  const hoverElems = document.querySelectorAll('[data-sound="hover"]');
  hoverElems.forEach(el => el.addEventListener('pointerenter', () => tryPlay(hoverSound)));
  const clickElems = document.querySelectorAll('[data-sound="click"]');
  clickElems.forEach(el => el.addEventListener('pointerdown', () => tryPlay(clickSound)));
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    addSoundEffects();
    unlockAudioOnFirstGesture();
    console.info('[sounds.js] sound bindings initialized (delayed)');
  }, 2000);
});
