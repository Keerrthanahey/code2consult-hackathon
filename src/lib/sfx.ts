let audio: HTMLAudioElement | null = null;
let muted = false;
let initialized = false;

function ensureInit() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  try {
    muted = window.localStorage.getItem("c2c-sound") === "off";
  } catch {
    muted = false;
  }
}

function getAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!audio) {
    try {
      const a = new Audio("/sounds/click.wav");
      a.preload = "auto";
      a.volume = 0.14;
      audio = a;
    } catch {
      audio = null;
    }
  }
  return audio;
}

export function isSoundMuted(): boolean {
  ensureInit();
  return muted;
}

export function setSoundMuted(value: boolean) {
  ensureInit();
  muted = value;
  try {
    window.localStorage.setItem("c2c-sound", value ? "off" : "on");
  } catch {
    /* persist is best-effort */
  }
}

export function playClickSound() {
  ensureInit();
  if (muted) return;
  const a = getAudio();
  if (!a) return;
  try {
    a.currentTime = 0;
    const promise = a.play();
    if (promise && typeof promise.catch === "function") {
      promise.catch(() => {
        /* audio failure must never break the UI */
      });
    }
  } catch {
    /* ignore */
  }
}