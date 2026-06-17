import { useRef, useCallback } from "react";

export default function useAlarmSound() {
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    intervalRef.current = setInterval(() => {
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "square";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.8, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    }, 600);
  }, []);

  const stop = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  }, []);

  return { start, stop };
}