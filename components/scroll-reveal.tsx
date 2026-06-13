"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { SHOWCASE, type Focus } from "@/lib/screens";
import { useMotionPref } from "@/components/providers";

/**
 * Stacked scroll reveal: the viewport pins while scrolling, and each product
 * screenshot rises and scales into place over the previous one — building a
 * peeking stack. Distinct from the crossfade ScrollShowcase on /tour.
 */
export function ScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = !useMotionPref().animate;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = SHOWCASE.length;

  if (reduced) {
    // static fallback: a simple responsive grid of every showcase screen
    return (
      <div className="mx-auto grid max-w-[1180px] gap-8 px-6 sm:grid-cols-2">
        {SHOWCASE.map((s) => (
          <div key={s.screen.file}>
            <Frame file={s.screen.file} alt={s.headline} focus={s.focus} priority={false}>
              <Caption headline={s.headline} body={s.body} />
            </Frame>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ height: `${n * 80 + 20}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* glow behind the stack */}
        <div className="pointer-events-none absolute h-[60vh] w-[60vw] max-w-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(253,211,59,0.16),transparent)]" />
        <div className="relative h-[clamp(340px,62vh,620px)] w-full max-w-[1040px] px-6">
          {SHOWCASE.map((s, i) => (
            <Card key={s.screen.file} progress={scrollYProgress} i={i} n={n} data={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({
  progress,
  i,
  n,
  data,
}: {
  progress: MotionValue<number>;
  i: number;
  n: number;
  data: (typeof SHOWCASE)[number];
}) {
  const seg = 1 / n;
  const isLast = i === n - 1;
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
      style={{ opacity, y, scale, rotateX, zIndex: i, transformPerspective: 1400 }}
      className="absolute inset-x-6 inset-y-0"
    >
      <Frame file={data.screen.file} alt={data.headline} focus={data.focus} priority={i === 0} fill>
        <span className="absolute right-4 top-[44px] z-10 rounded-full bg-ink/80 px-[10px] py-1 text-[11px] font-extrabold tracking-[0.08em] text-white backdrop-blur">
          {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <Caption headline={data.headline} body={data.body} />
      </Frame>
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

function Caption({ headline, body }: { headline: string; body: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/85 via-ink/45 to-transparent px-6 pb-5 pt-16 text-white">
      <h3 className="text-[clamp(20px,2.4vw,28px)] font-extrabold leading-[1.15] tracking-[-0.02em]">
        {headline}
      </h3>
      <p className="mt-1.5 max-w-[520px] text-[14px] leading-[1.55] text-white/80">{body}</p>
    </div>
  );
}

function Frame({
  file,
  alt,
  focus,
  priority,
  fill = false,
  children,
}: {
  file: string;
  alt: string;
  focus?: Focus;
  priority: boolean;
  fill?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[18px] border border-line bg-white shadow-big ${
        fill ? "h-full" : ""
      }`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-mist px-4 py-[9px]">
        <span className="h-[9px] w-[9px] rounded-full bg-[#F6C9C4]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#F6E3B4]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#CBE7D2]" />
        <span className="ml-2 truncate text-[11px] text-ink-3">company.proprt.app</span>
      </div>
      <div className={`relative overflow-hidden ${fill ? "h-[calc(100%-34px)]" : "aspect-[16/9.4]"}`}>
        <Image
          src={`/screens/${file}`}
          alt={alt}
          fill
          priority={priority}
          unoptimized
          sizes="(max-width: 1024px) 100vw, 1040px"
          className="object-cover"
          style={
            focus
              ? { objectPosition: focus.pos, transform: `scale(${focus.zoom})`, transformOrigin: focus.pos }
              : { objectPosition: "top" }
          }
        />
      </div>
      {children}
    </div>
  );
}
