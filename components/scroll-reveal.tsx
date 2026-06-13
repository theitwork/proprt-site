"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { HOME_REVEAL, SCREEN_ASPECT, screenSrc, type Reveal } from "@/lib/screens";
import { useMotionPref } from "@/components/providers";

const N = HOME_REVEAL.length;

/**
 * Stacked scroll reveal: the viewport pins while scrolling, and each product
 * screenshot rises and scales into place over the previous one — building a
 * peeking stack. A single caption below the stage crossfades to the active
 * screen, so text never covers the UI.
 */
export function ScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = !useMotionPref().animate;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(N - 1, Math.max(0, Math.floor(v * N)));
    if (idx !== active) setActive(idx);
  });

  if (reduced) {
    // static fallback: a simple responsive grid of every reveal screen
    return (
      <div className="mx-auto grid max-w-[1180px] gap-x-8 gap-y-12 px-4 sm:grid-cols-2 sm:px-6">
        {HOME_REVEAL.map((s, i) => (
          <div key={s.screen.file}>
            <Frame file={s.screen.file} alt={s.headline} priority={false} />
            <div className="mt-4 px-1 text-center">
              <CaptionBody index={i} headline={s.headline} body={s.body} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ height: `${N * 80 + 20}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* glow behind the stack */}
        <div className="pointer-events-none absolute h-[58vh] w-[60vw] max-w-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(253,211,59,0.16),transparent)]" />

        {/* image stack */}
        <div className="relative grid w-full max-w-[1120px] px-3 sm:px-6">
          {HOME_REVEAL.map((s, i) => (
            <Card key={s.screen.file} progress={scrollYProgress} i={i} data={s} />
          ))}
        </div>

        {/* single caption below, crossfading to the active screen */}
        <div className="relative mt-6 h-[132px] w-full max-w-[640px] px-4 sm:h-[120px]">
          {HOME_REVEAL.map((s, i) => (
            <motion.div
              key={s.screen.file}
              initial={false}
              animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-0 px-1 text-center"
              style={{ pointerEvents: i === active ? "auto" : "none" }}
            >
              <CaptionBody index={i} headline={s.headline} body={s.body} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ progress, i, data }: { progress: MotionValue<number>; i: number; data: Reveal }) {
  const seg = 1 / N;
  const isLast = i === N - 1;
  // Scroll-linked transforms run through the Web Animations API, whose keyframe
  // offsets must be within [0,1] and strictly increasing — clamp + dedupe here.
  const range = ramp(
    isLast
      ? [(i - 0.85) * seg, i * seg]
      : [(i - 0.85) * seg, i * seg, (i + 0.9) * seg, (i + 1.7) * seg],
  );
  const opacity = useTransform(progress, range, isLast ? [0, 1] : [0, 1, 1, 0.25]);
  const y = useTransform(progress, range, isLast ? [90, 0] : [90, 0, 0, -80]);
  const scale = useTransform(progress, range, isLast ? [0.9, 1] : [0.9, 1, 1, 0.85]);
  const rotateX = useTransform(progress, range, isLast ? [6, 0] : [6, 0, 0, 4]);

  return (
    <motion.div
      style={{ opacity, y, scale, rotateX, zIndex: i, transformPerspective: 1400, gridArea: "1 / 1" }}
      className="min-w-0"
    >
      <Frame file={data.screen.file} alt={data.headline} priority={i === 0} />
    </motion.div>
  );
}

/** Clamp breakpoints into [0,1] and force strictly-increasing offsets. */
function ramp(points: number[]): number[] {
  const eps = 1e-4;
  let prev = -Infinity;
  return points.map((p) => {
    let v = Math.min(1, Math.max(0, p));
    if (v <= prev) v = Math.min(1, prev + eps);
    prev = v;
    return v;
  });
}

function CaptionBody({ index, headline, body }: { index: number; headline: string; body: string }) {
  return (
    <>
      <span className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-gold-deep">
        {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
      </span>
      <h3 className="mt-1.5 text-[clamp(19px,2.4vw,28px)] font-extrabold leading-[1.15] tracking-[-0.02em]">
        {headline}
      </h3>
      <p className="mx-auto mt-1.5 max-w-[560px] text-[14.5px] leading-[1.55] text-ink-2">{body}</p>
    </>
  );
}

function Frame({ file, alt, priority }: { file: string; alt: string; priority: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-line bg-white shadow-big">
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
          sizes="(max-width: 1024px) 100vw, 1120px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
