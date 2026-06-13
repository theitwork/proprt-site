"use client";

import { Star } from "lucide-react";

/** ⚠️ Placeholder testimonials (fictional personas from the approved draft) — replace before launch. */
const QUOTES = [
  {
    q: "Every portal inquiry used to sit in five inboxes. Now it lands in one pipeline with an owner and a deadline. Our response time went from hours to minutes.",
    who: "Rana K.",
    role: "Sales Director, boutique brokerage",
    bg: "#FDE89A",
  },
  {
    q: "The buyer-matching is the feature we didn't know we needed. New listing goes live, Proprt tells us which 14 buyers to call first.",
    who: "Marwan S.",
    role: "Managing Partner, residential agency",
    bg: "#DCEDE3",
  },
  {
    q: "Commission splits used to take our admin a full day at month-end. Now it's a report we export in two clicks.",
    who: "Lara H.",
    role: "Operations Manager, multi-branch firm",
    bg: "#E8E3F6",
  },
  {
    q: "Agents actually use it — that's the difference. WhatsApp threads, viewings and notes all sit on the contact, so nothing lives in someone's phone anymore.",
    who: "Jad A.",
    role: "CEO, property consultancy",
    bg: "#FBE3D6",
  },
  {
    q: "We replaced a generic CRM, a spreadsheet and two trackers. One login, and my Monday pipeline review takes 20 minutes instead of two hours.",
    who: "Nour T.",
    role: "Head of Sales, off-plan specialist",
    bg: "#E0ECF8",
  },
];

export function TestimonialMarquee() {
  const doubled = [...QUOTES, ...QUOTES];
  return (
    <div className="edge-mask mt-2 overflow-hidden">
      <div className="anim-marquee flex w-max gap-5 py-[6px] pb-3">
        {doubled.map((t, i) => (
          <figure
            key={i}
            aria-hidden={i >= QUOTES.length}
            className="flex w-[360px] flex-col gap-[14px] rounded-card border border-line bg-white p-6 shadow-soft"
          >
            <div className="flex gap-[2px] text-gold-deep" aria-label="5 star rating">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-[14px] w-[14px] fill-current" />
              ))}
            </div>
            <blockquote className="flex-1 text-[14.5px] leading-[1.6] text-ink-2">
              &ldquo;{t.q}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-[11px]">
              <span
                className="grid h-10 w-10 place-items-center rounded-full text-[13px] font-extrabold"
                style={{ background: t.bg }}
              >
                {t.who.split(" ").map((w) => w[0]).join("")}
              </span>
              <span>
                <b className="block text-[14px]">{t.who}</b>
                <span className="text-[12.5px] text-ink-3">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
