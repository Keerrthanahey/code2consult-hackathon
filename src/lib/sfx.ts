let audio: HTMLAudioElement | null = null;
let synth: OscillatorNode | null = null;
let muted = false;
let initialized = false;
let audioContext: AudioContext | null = null;

function ensureInit() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  try {
    muted = window.localStorage.getItem("c2c-sound") === "off";
  } catch {
    muted = false;
  }
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      audioContext = null;
    }
  }
  return audioContext;
}

/**
 * Play a futuristic neon beep sound using Web Audio API.
 * Small, digital, soft sound - no annoying arcade sounds.
 */
export function playClickSound() {
  ensureInit();
  if (muted) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    // Resume audio context if suspended (required by browser autoplay policy)
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {
        /* audio resume failure is best-effort */
      });
    }

    // Create a short neon beep using Web Audio API
    const now = ctx.currentTime;
    const duration = 0.08; // 80ms - very short

    // Create nodes
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Connect
    osc.connect(gain);
    gain.connect(ctx.destination);

    // Configure oscillator
    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, now); // Start at 1200Hz
    osc.frequency.exponentialRampToValueAtTime(800, now + duration); // Slide down to 800Hz

    // Configure gain envelope
    gain.gain.setValueAtTime(0.05, now); // Soft volume
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration); // Quick fade

    // Play
    osc.start(now);
    osc.stop(now + duration);
  } catch {
    /* audio generation must never break the UI */
  }
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
