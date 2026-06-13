"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { Sparkles } from "lucide-react";

type MotionPref = { animate: boolean; toggle: () => void };
const MotionPrefContext = createContext<MotionPref>({ animate: true, toggle: () => {} });

/** Effective animation preference: localStorage override, else OS setting. */
export function useMotionPref() {
  return useContext(MotionPrefContext);
}

const KEY = "proprt-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  const [osReduced, setOsReduced] = useState(false);
  const [override, setOverride] = useState<"on" | "off" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setOsReduced(mq.matches);
    const onChange = () => setOsReduced(mq.matches);
    mq.addEventListener("change", onChange);
    try {
      const v = localStorage.getItem(KEY);
      if (v === "on" || v === "off") setOverride(v);
    } catch {}
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const animate = override ? override === "on" : !osReduced;

  useEffect(() => {
    if (!mounted) return;
    const el = document.documentElement;
    el.classList.toggle("force-motion", animate && osReduced);
    el.classList.toggle("force-still", !animate && !osReduced);
  }, [animate, osReduced, mounted]);

  const toggle = () => {
    const next = animate ? "off" : "on";
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    setOverride(next);
  };

  return (
    <MotionPrefContext.Provider value={{ animate, toggle }}>
      <MotionConfig reducedMotion={!mounted ? "user" : animate ? "never" : "always"}>
        {children}
        {mounted && (
          <button
            onClick={toggle}
            aria-pressed={animate}
            title="Toggle animations"
            className={`fixed bottom-5 right-5 z-[150] flex cursor-pointer items-center gap-2 rounded-full border px-4 py-[10px] text-[12.5px] font-bold shadow-mid backdrop-blur-md transition-colors ${
              animate
                ? "border-gold-deep/40 bg-ink/90 text-gold"
                : "border-line-2 bg-ink/85 text-white/70 hover:text-white"
            }`}
          >
            <Sparkles className="h-[14px] w-[14px]" />
            {animate ? "Motion on" : "Motion off"}
          </button>
        )}
      </MotionConfig>
    </MotionPrefContext.Provider>
  );
}
