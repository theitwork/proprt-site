"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Users,
  KanbanSquare,
  CalendarDays,
  Megaphone,
  Coins,
  BarChart3,
} from "lucide-react";
import { CountUp } from "@/components/count-up";
import { Pin } from "@/components/ui";

const SIDE = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Building2, label: "Listings", badge: "142" },
  { icon: Users, label: "Leads", badge: "38" },
  { icon: KanbanSquare, label: "Deals", on: true },
  { icon: CalendarDays, label: "Viewings" },
];
const SIDE_GROW = [
  { icon: Megaphone, label: "Marketing" },
  { icon: Coins, label: "Commissions" },
  { icon: BarChart3, label: "Reports" },
];

const COLS: {
  head: string;
  count: number;
  deals: { t: string; tag: string; tone: "y" | "g" | "b"; v: string }[];
}[] = [
  {
    head: "New inquiry",
    count: 12,
    deals: [
      { t: "2BR · Marina Towers", tag: "Portal", tone: "b", v: "$420K" },
      { t: "Studio · Downtown", tag: "WhatsApp", tone: "g", v: "$185K" },
    ],
  },
  {
    head: "Viewing",
    count: 8,
    deals: [
      { t: "Villa · Palm District", tag: "Hot", tone: "y", v: "$2.4M" },
      { t: "3BR · Bay Residences", tag: "Referral", tone: "b", v: "$760K" },
    ],
  },
  {
    head: "Offer",
    count: 5,
    deals: [{ t: "Penthouse · The Crest", tag: "Hot", tone: "y", v: "$3.1M" }],
  },
  {
    head: "Closing",
    count: 3,
    deals: [{ t: "Office · Gate Plaza", tag: "Won", tone: "g", v: "$1.2M" }],
  },
];

const TONE = {
  y: "bg-gold-soft text-[#9A7B00]",
  g: "bg-[#E3F6ED] text-green",
  b: "bg-[#EAF1FB] text-[#2E6BC4]",
};

export function AppMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1600 }}
      className="mt-16 w-full max-w-[1060px] overflow-hidden rounded-[22px] border border-line bg-white text-left shadow-big"
      aria-hidden="true"
    >
      {/* browser bar */}
      <div className="flex items-center gap-2 border-b border-line bg-mist px-[18px] py-3">
        <span className="h-[11px] w-[11px] rounded-full bg-[#F6C9C4]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#F6E3B4]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#CBE7D2]" />
        <span className="mx-auto w-full max-w-[320px] rounded-lg border border-line bg-white px-[14px] py-[5px] text-center text-[12px] text-ink-3">
          company.proprt.app/deals
        </span>
      </div>

      <div className="grid min-h-[480px] md:grid-cols-[212px_1fr]">
        {/* sidebar */}
        <aside className="hidden border-r border-line bg-[#FCFBF8] p-3 text-[13px] md:block">
          <div className="flex items-center gap-[7px] px-2 pb-4 pt-[6px] text-[15px] font-extrabold">
            <Pin className="h-5 w-5" />
            Proprt
          </div>
          {SIDE.map((s) => (
            <div
              key={s.label}
              className={`mb-[2px] flex items-center gap-[9px] rounded-lg px-[10px] py-2 font-semibold ${
                s.on
                  ? "bg-gold-soft text-ink shadow-[inset_0_0_0_1px_#F2DD96]"
                  : "text-ink-2"
              }`}
            >
              <s.icon className="h-[15px] w-[15px]" strokeWidth={2} />
              {s.label}
              {s.badge && (
                <span className="ml-auto rounded-full bg-gold px-[7px] text-[10.5px] font-extrabold">
                  {s.badge}
                </span>
              )}
            </div>
          ))}
          <div className="px-[10px] pb-[6px] pt-[14px] text-[10.5px] font-extrabold uppercase tracking-[0.09em] text-ink-3">
            Grow
          </div>
          {SIDE_GROW.map((s) => (
            <div key={s.label} className="mb-[2px] flex items-center gap-[9px] rounded-lg px-[10px] py-2 font-semibold text-ink-2">
              <s.icon className="h-[15px] w-[15px]" strokeWidth={2} />
              {s.label}
            </div>
          ))}
        </aside>

        {/* main */}
        <div className="bg-white p-5 md:p-6">
          <div className="mb-[18px] flex items-center justify-between">
            <h4 className="text-[17px] font-extrabold">Sales pipeline · June</h4>
            <div className="flex gap-2">
              <span className="rounded-lg border border-line-2 bg-white px-3 py-[7px] text-[12px] font-bold text-ink-2">
                Filter
              </span>
              <span className="rounded-lg bg-gold px-3 py-[7px] text-[12px] font-bold text-ink">
                + New deal
              </span>
            </div>
          </div>

          <div className="mb-[18px] grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Kpi label="Pipeline value">
              <CountUp to={48} prefix="$" suffix=".2M" />
              <Delta up>▲ 12% vs May</Delta>
            </Kpi>
            <Kpi label="Active leads">
              <CountUp to={384} />
              <Delta up>▲ 41 this week</Delta>
            </Kpi>
            <Kpi label="Viewings booked">
              <CountUp to={57} />
              <Delta up>▲ 9 today</Delta>
            </Kpi>
            <Kpi label="Avg. response">
              <span>4m</span>
              <Delta up>▼ from 3.2h</Delta>
            </Kpi>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {COLS.map((c) => (
              <div key={c.head} className="rounded-xl border border-line bg-mist p-[10px]">
                <div className="flex justify-between px-1 pb-2 pt-[2px] text-[11.5px] font-extrabold uppercase tracking-[0.04em] text-ink-2">
                  <span>{c.head}</span>
                  <span>{c.count}</span>
                </div>
                {c.deals.map((d) => (
                  <div
                    key={d.t}
                    className="mb-2 rounded-[10px] border border-line bg-white px-[11px] py-[10px] shadow-soft"
                  >
                    <div className="text-[12.5px] font-bold leading-[1.3]">{d.t}</div>
                    <div className="mt-[7px] flex items-center justify-between text-[11px] font-semibold text-ink-3">
                      <span
                        className={`rounded-[5px] px-[6px] py-[2px] text-[9.5px] font-extrabold uppercase tracking-[0.03em] ${TONE[d.tone]}`}
                      >
                        {d.tag}
                      </span>
                      <span className="font-extrabold text-ink">{d.v}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Kpi({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-white px-[15px] py-[13px]">
      <div className="text-[11.5px] font-bold uppercase tracking-[0.05em] text-ink-3">{label}</div>
      <div className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">{children}</div>
    </div>
  );
}

function Delta({ children, up }: { children: React.ReactNode; up?: boolean }) {
  return (
    <div className={`mt-[2px] text-[11.5px] font-bold ${up ? "text-green" : "text-ink-3"}`}>
      {children}
    </div>
  );
}
