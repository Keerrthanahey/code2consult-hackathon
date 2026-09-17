/**
 * AUDIBLE CYBER CLICK SOUND UTILITY
 * Uses Web Audio API to generate a loud, clear cyber beep
 * Respects browser autoplay restrictions
 */

let audioContext: AudioContext | null = null;
let soundEnabled = true;
let initialized = false;

function ensureInit() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  try {
    soundEnabled = window.localStorage.getItem("c2c-sound") !== "off";
  } catch {
    soundEnabled = true;
  }
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.error("AudioContext unavailable:", e);
      audioContext = null;
    }
  }

  return audioContext;
}

/**
 * LOUD, AUDIBLE cyber beep sound
 * - 120ms duration
 * - Frequency sweep: 1500Hz → 900Hz (pitch drop)
 * - 15% volume (LOUD - clearly audible)
 * - Fast attack, quick decay
 */
export function playClickSound() {
  ensureInit();
  if (!soundEnabled) return;

  const ctx = getAudioContext();
  if (!ctx) {
    console.warn("AudioContext not available");
    return;
  }

  try {
    // Resume audio context if suspended (required by browser autoplay policy)
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {
        /* ignore */
      });
    }

    const now = ctx.currentTime;
    const duration = 0.12; // 120ms - long enough to be clearly audible

    // PRIMARY OSCILLATOR - Main beep tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(1500, now); // Start high: 1500Hz
    osc1.frequency.exponentialRampToValueAtTime(900, now + duration * 0.7); // Sweep down

    gain1.gain.setValueAtTime(0.15, now); // LOUD: 15% volume
    gain1.gain.exponentialRampToValueAtTime(0.02, now + duration); // Decay to quiet

    osc1.start(now);
    osc1.stop(now + duration);

    // SECONDARY HARMONIC - Add richness/brightness
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(3000, now); // High harmonic: 3000Hz
    osc2.frequency.exponentialRampToValueAtTime(1800, now + duration * 0.7);

    gain2.gain.setValueAtTime(0.08, now); // 8% volume
    gain2.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc2.start(now);
    osc2.stop(now + duration);

    // Optional: Add a subtle click/attack transient
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);

    clickOsc.type = "triangle";
    clickOsc.frequency.setValueAtTime(2200, now);

    clickGain.gain.setValueAtTime(0.12, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02); // Quick click: 20ms

    clickOsc.start(now);
    clickOsc.stop(now + 0.02);
  } catch (e) {
    console.error("Error playing click sound:", e);
    /* audio generation must never break the UI */
  }
}

export function isSoundEnabled(): boolean {
  ensureInit();
  return soundEnabled;
}

export function setSoundEnabled(value: boolean) {
  ensureInit();
  soundEnabled = value;
  try {
    window.localStorage.setItem("c2c-sound", value ? "on" : "off");
  } catch {
    /* persist is best-effort */
  }
}

export function toggleSound(): boolean {
  setSoundEnabled(!soundEnabled);
  return soundEnabled;
}
