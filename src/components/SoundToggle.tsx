"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isSoundEnabled, setSoundEnabled } from "@/lib/sound";

export default function SoundToggle() {
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialize from localStorage
    setSoundEnabledState(isSoundEnabled());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle sound"
        title="Toggle sound"
        className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-neon-cyan/30 transition-all"
      >
        <Volume2 className="h-5 w-5 text-neon-cyan" />
      </button>
    );
  }

  const handleToggle = () => {
    const newState = !soundEnabled;
    setSoundEnabledState(newState);
    setSoundEnabled(newState);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
      title={soundEnabled ? "Mute sound" : "Enable sound"}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-neon-cyan/30 transition-all duration-300 hover:border-neon-cyan hover:shadow-[0_0_12px_rgba(0,245,255,0.3)]"
    >
      {soundEnabled ? (
        <Volume2 className="h-5 w-5 text-neon-cyan transition-transform" />
      ) : (
        <VolumeX className="h-5 w-5 text-neon-magenta transition-transform" />
      )}
    </button>
  );
}
