"use client";

import { ArrowRight, Check, Table2, Mail, MessageCircle, Megaphone, Sigma, Database } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Btn, Pin } from "@/components/ui";

const TODAY = [
  { icon: Database, bg: "#EAF1FB", name: "Generic CRM", pain: "$45/agent/mo" },
  { icon: Table2, bg: "#E9F6EE", name: "Listings spreadsheet", pain: "Always outdated" },
  { icon: Mail, bg: "#FBEFE3", name: "Portal lead inboxes", pain: "Leads go cold" },
  { icon: MessageCircle, bg: "#E6F4F1", name: "WhatsApp on phones", pain: "Zero visibility" },
  { icon: Megaphone, bg: "#F3ECFA", name: "Marketing tool", pain: "$29/mo" },
  { icon: Sigma, bg: "#FBF3DC", name: "Commission tracker", pain: "Month-end chaos" },
];

const INSIDE = [
  "Listings & inventory",
  "Portal lead capture",
  "Deals pipeline",
  "Viewings calendar",
  "WhatsApp inbox",
  "Buyer matching",
  "Marketing campaigns",
  "Commission tracking",
];

export function StackCompare() {
  return (
    <div className="grid items-center gap-[10px] lg:grid-cols-[1fr_70px_380px]">
      <Reveal className="rounded-card border border-line bg-mist p-6">
        <div className="mb-[14px] flex items-center justify-between text-[15px] font-extrabold">
          What agencies juggle today
          <span className="rounded-full border border-line-2 bg-white px-3 py-1 text-[12px] font-extrabold text-ink-2">
            6+ tools
          </span>
        </div>
        {TODAY.map((r) => (
          <div
            key={r.name}
            className="mb-[9px] flex items-center gap-3 rounded-xl border border-line bg-white px-[14px] py-3 text-[14px] transition-all duration-200 hover:translate-x-1 hover:shadow-soft"
          >
            <span
              className="grid h-8 w-8 flex-none place-items-center rounded-[9px]"
              style={{ background: r.bg }}
            >
              <r.icon className="h-4 w-4 text-ink" strokeWidth={2} />
            </span>
            <b className="font-bold">{r.name}</b>
            <span className="ml-auto text-[12.5px] font-semibold text-ink-3">{r.pain}</span>
          </div>
        ))}
        <div className="mt-1 rounded-[10px] border border-[#F2D8C9] bg-[#FBEFE8] p-[10px] text-center text-[13px] font-bold text-[#B0552F]">
          Scattered data · No accountability · $200+/mo
        </div>
      </Reveal>

      <Reveal delay={0.08} className="text-center text-[30px] font-extrabold text-gold-deep max-lg:rotate-90">
        <ArrowRight className="mx-auto h-8 w-8" />
      </Reveal>

      <Reveal delay={0.16} className="relative overflow-hidden rounded-card bg-ink p-7 text-white shadow-mid">
        <span className="pointer-events-none absolute -right-[60px] -top-[60px] h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,rgba(253,211,59,0.25),transparent_70%)]" />
        <div className="relative mb-[10px] flex items-center gap-[10px] text-[19px] font-extrabold">
          <Pin className="h-[26px] w-[26px]" />
          Proprt
          <span className="ml-auto rounded-full bg-gold px-[11px] py-1 text-[11px] font-extrabold text-ink">
            All-in-one
          </span>
        </div>
        <p className="relative mb-[18px] text-[14px] leading-[1.6] text-[#CFCEC9]">
          Everything on the left — one login, one pipeline, one source of truth for the whole
          agency.
        </p>
        <ul className="relative mb-[22px] grid grid-cols-2 gap-x-[14px] gap-y-[9px]">
          {INSIDE.map((f) => (
            <li key={f} className="flex items-center gap-2 text-[13.5px] font-semibold">
              <Check className="h-[14px] w-[14px] flex-none text-gold" strokeWidth={3} />
              {f}
            </li>
          ))}
        </ul>
        <p className="relative mb-[18px] text-[13.5px] leading-[1.6] text-[#CFCEC9]">
          Interested? Pricing follows your agency — team size and the modules you switch on. Tell
          us about your operation and we&rsquo;ll come back with a tailored proposal.
        </p>
        <Btn href="/contact" arrow className="relative w-full justify-center">
          Get a tailored quote
        </Btn>
      </Reveal>
    </div>
  );
}
