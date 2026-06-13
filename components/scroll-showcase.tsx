"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { SHOWCASE, SCREEN_ASPECT, screenSrc } from "@/lib/screens";
import { useMotionPref } from "@/components/providers";

/**
 * Sticky scroll showcase: the viewport pins while scrolling through N segments;
 * each segment crossfades a real product screenshot and its caption.
 */
export function ScrollShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = !useMotionPref().animate;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const n = SHOWCASE.length;
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    if (idx !== active) setActive(idx);
  });

  // subtle parallax on the frame
  const frameY = useTransform(scrollYProgress, [0, 1], [12, -12]);

  if (reduced) {
    // static fallback: simple stacked list
    return (
      <div className="mx-auto max-w-[1180px] space-y-16 px-6">
        {SHOWCASE.map((s) => (
          <div key={s.screen.file} className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.4fr]">
            <div>
              <h3 className="mb-2 text-[26px] font-extrabold tracking-[-0.02em]">{s.headline}</h3>
              <p className="text-[15.5px] leading-[1.65] text-ink-2">{s.body}</p>
            </div>
            <Frame file={s.screen.file} alt={s.headline} priority={false} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ height: `${n * 90}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1180px] items-center gap-10 px-6 lg:grid-cols-[0.72fr_1.4fr]">
          {/* captions + progress */}
          <div className="relative">
            <div className="mb-7 flex gap-[6px]" role="tablist" aria-label="Showcase progress">
              {SHOWCASE.map((_, i) => (
                <span
                  key={i}
                  className={`h-[5px] rounded-full transition-all duration-500 ${
                    i === active ? "w-9 bg-gold" : "w-[14px] bg-line-2"
                  }`}
                />
              ))}
            </div>
            <div className="relative min-h-[170px]">
              {SHOWCASE.map((s, i) => (
                <motion.div
                  key={s.screen.file}
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 18 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                  style={{ pointerEvents: i === active ? "auto" : "none" }}
                >
                  <span className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-gold-deep">
                    {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 mb-3 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.12] tracking-[-0.02em]">
                    {s.headline}
                  </h3>
                  <p className="max-w-[360px] text-[15.5px] leading-[1.65] text-ink-2">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* screenshot stage */}
          <motion.div style={{ y: frameY }} className="relative grid">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] bg-[radial-gradient(closest-side,rgba(253,211,59,0.18),transparent)]" />
            {SHOWCASE.map((s, i) => (
              <motion.div
                key={s.screen.file}
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  scale: i === active ? 1 : 0.96,
                  rotateX: i === active ? 0 : 4,
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformPerspective: 1400, gridArea: "1 / 1" }}
                className="min-w-0"
              >
                <Frame file={s.screen.file} alt={s.headline} priority={i === 0} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Frame({ file, alt, priority }: { file: string; alt: string; priority: boolean }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-line bg-white shadow-big">
      <div className="flex items-center gap-2 border-b border-line bg-mist px-4 py-[9px]">
        <span className="h-[9px] w-[9px] rounded-full bg-[#F6C9C4]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#F6E3B4]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#CBE7D2]" />
        <span className="ml-2 truncate text-[11px] text-ink-3">company.proprt.app</span>
      </div>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: SCREEN_ASPECT }}>
        <Image
          src={screenSrc(file)}
          alt={alt}
          fill
          priority={priority}
          unoptimized
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
