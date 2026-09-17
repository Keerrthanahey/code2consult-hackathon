/**
 * Premium Cyber UI Click Sound
 * Short, crisp, digital - 50-80ms
 * Web Audio API synthesis
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
      consult.error("AudioContext unavailable:", e);
      audioContext = null;
    }
  }

  return audioContext;
}

/**
 * PREMIUM CYBER CLICK
 * - 60ms duration
 * - Frequency: 2000Hz → 1200Hz (pitch drop)
 * - Very short, crisp, high-frequency transient
 * - 8% volume (subtle but audible)
 */
export function playClickSound() {
  ensureInit();
  if (!soundEnabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const duration = 0.06; // 60ms - premium UI click

    // HIGH-FREQUENCY TRANSIENT (main click character)
    const transient = ctx.createOscillator();
    const transientGain = ctx.createGain();

    transient.connect(transientGain);
    transientGain.connect(ctx.destination);

    transient.type = "sine";
    transient.frequency.setValueAtTime(2500, now); // Very high start
    transient.frequency.exponentialRampToValueAtTime(1200, now + duration); // Quick drop

    transientGain.gain.setValueAtTime(0.08, now); // 8% volume
    transientGain.gain.exponentialRampToValueAtTime(0.001, now + duration); // Fast decay

    transient.start(now);
    transient.stop(now + duration);

    // SUBTLE HARMONIC (adds texture)
    const harmonic = ctx.createOscillator();
    const harmonicGain = ctx.createGain();

    harmonic.connect(harmonicGain);
    harmonicGain.connect(ctx.destination);

    harmonic.type = "triangle";
    harmonic.frequency.setValueAtTime(4000, now); // Very high harmonic
    harmonic.frequency.exponentialRampToValueAtTime(2400, now + duration * 0.7);

    harmonicGain.gain.setValueAtTime(0.03, now); // Subtle
    harmonicGain.gain.exponentialRampToValueAtTime(0, now + duration);

    harmonic.start(now);
    harmonic.stop(now + duration);
  } catch (e) {
    /* silently fail */
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
  } catch {}
}

export function toggleSound(): boolean {
  setSoundEnabled(!soundEnabled);
  return soundEnabled;
}
