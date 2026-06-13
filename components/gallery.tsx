"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ALL_SCREENS, SCREEN_GROUPS } from "@/lib/screens";

const ZOOM = 2.4;

export function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const close = useCallback(() => {
    setIdx(null);
    setZoomed(false);
  }, []);
  const step = useCallback((d: number) => {
    setZoomed(false);
    setOrigin("50% 50%");
    setIdx((v) => (v === null ? v : (v + d + ALL_SCREENS.length) % ALL_SCREENS.length));
  }, []);

  const pointPct = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100));
    return `${x.toFixed(1)}% ${y.toFixed(1)}%`;
  };

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [idx, close, step]);

  let offset = 0;
  return (
    <div>
      {SCREEN_GROUPS.map((g) => {
        const start = offset;
        offset += g.screens.length;
        return (
          <section key={g.id} className="mb-14">
            <div className="mb-5 flex items-baseline gap-3">
              <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">{g.title}</h3>
              <span className="text-[13.5px] font-semibold text-ink-3">{g.tag}</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.screens.map((s, i) => (
                <motion.button
                  key={s.file}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                  onClick={() => setIdx(start + i)}
                  className="group cursor-zoom-in overflow-hidden rounded-[14px] border border-line bg-white text-left shadow-soft transition-all duration-200 hover:-translate-y-[3px] hover:border-gold-deep hover:shadow-mid"
                >
                  <div className="relative aspect-[16/9.6] overflow-hidden bg-mist">
                    <Image
                      src={`/screens/${s.file}`}
                      alt={`${s.title} — ${s.caption}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="px-4 py-3">
                    <b className="block text-[14px]">{s.title}</b>
                    <span className="text-[12.5px] text-ink-3">{s.caption}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>
        );
      })}

      <AnimatePresence>
        {idx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col bg-ink/95 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Screenshot viewer"
            onClick={close}
          >
            <div className="flex items-center gap-4 px-6 py-4 text-white" onClick={(e) => e.stopPropagation()}>
              <b className="text-[15px]">{ALL_SCREENS[idx].title}</b>
              <span className="text-[13px] text-white/60">
                {idx + 1} / {ALL_SCREENS.length}
              </span>
              <button
                onClick={close}
                aria-label="Close viewer"
                className="ml-auto grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 md:px-20">
              <motion.div
                key={ALL_SCREENS[idx].file}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative h-full w-full overflow-hidden"
                style={{ cursor: zoomed ? "zoom-out" : "zoom-in" }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (zoomed) {
                    setZoomed(false);
                  } else {
                    setOrigin(pointPct(e));
                    setZoomed(true);
                  }
                }}
                onMouseMove={(e) => {
                  if (zoomed) setOrigin(pointPct(e));
                }}
              >
                <Image
                  src={`/screens/${ALL_SCREENS[idx].file}`}
                  alt={ALL_SCREENS[idx].title}
                  fill
                  unoptimized
                  sizes="100vw"
                  className="rounded-xl object-contain"
                  style={{
                    transform: zoomed ? `scale(${ZOOM})` : "scale(1)",
                    transformOrigin: origin,
                    transition: "transform 0.25s ease",
                    willChange: "transform",
                  }}
                  draggable={false}
                />
              </motion.div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous screenshot"
                className="absolute left-4 hidden h-12 w-12 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold hover:text-ink md:grid"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next screenshot"
                className="absolute right-4 hidden h-12 w-12 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold hover:text-ink md:grid"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <p className="pb-5 text-center text-[14px] text-white/70" onClick={(e) => e.stopPropagation()}>
              <b className="text-gold">{ALL_SCREENS[idx].title}</b> — {ALL_SCREENS[idx].caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
