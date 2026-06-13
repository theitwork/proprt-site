"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Building2, Coins, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";

function FeatureCopy({
  icon: Icon,
  iconBg,
  title,
  body,
  subs,
}: {
  icon: typeof Users;
  iconBg: string;
  title: string;
  body: string;
  subs: { b: string; s: string }[];
}) {
  return (
    <Reveal>
      <div className="mb-5 grid h-[52px] w-[52px] place-items-center rounded-[14px]" style={{ background: iconBg }}>
        <Icon className="h-6 w-6 text-ink" strokeWidth={2} />
      </div>
      <h3 className="mb-[13px] text-[clamp(23px,2.6vw,29px)] font-extrabold leading-[1.18] tracking-[-0.02em]">
        {title}
      </h3>
      <p className="mb-[22px] text-[15.5px] leading-[1.65] text-ink-2">{body}</p>
      {subs.map((s) => (
        <div key={s.b} className="border-t border-line py-[13px]">
          <b className="mb-[3px] block text-[14.5px]">{s.b}</b>
          <span className="text-[13.5px] leading-[1.55] text-ink-3">{s.s}</span>
        </div>
      ))}
      <Link
        href="/product"
        className="group mt-4 inline-flex items-center gap-[6px] border-b-2 border-gold pb-[2px] text-[14px] font-bold text-ink"
      >
        Learn more
        <ArrowRight className="h-[14px] w-[14px] transition-transform duration-200 group-hover:translate-x-[3px]" />
      </Link>
    </Reveal>
  );
}

function Card({ title, live, children }: { title: string; live?: boolean; children: React.ReactNode }) {
  return (
    <Reveal delay={0.08} className="flex justify-center">
      <div className="w-full max-w-[460px] rounded-card border border-line bg-white p-5 shadow-mid">
        <div className="mb-3 flex items-center gap-2 border-b border-line pb-[14px] text-[14px] font-extrabold">
          {title}
          {live && (
            <>
              <span className="anim-pulse-dot ml-auto h-2 w-2 rounded-full bg-green" />
              <span className="text-[11px] font-extrabold text-green">LIVE</span>
            </>
          )}
        </div>
        {children}
      </div>
    </Reveal>
  );
}

const TONE = {
  y: "bg-gold-soft text-[#9A7B00]",
  g: "bg-[#E3F6ED] text-green",
  b: "bg-[#EAF1FB] text-[#2E6BC4]",
};

function LeadRow({
  tag,
  tone,
  name,
  q,
  t,
  assigned,
}: {
  tag?: string;
  tone?: "y" | "g" | "b";
  name: string;
  q: string;
  t?: string;
  assigned?: boolean;
}) {
  return (
    <StaggerItem
      className={`mb-2 flex items-center gap-[10px] rounded-[11px] border px-3 py-[11px] text-[13px] transition-all duration-200 hover:translate-x-[3px] hover:shadow-soft ${
        assigned ? "border-[#CFE9DC] bg-[#F6FBF8]" : "border-line bg-white"
      }`}
    >
      {tag && tone && (
        <span className={`rounded-[5px] px-[6px] py-[2px] text-[9.5px] font-extrabold uppercase ${TONE[tone]}`}>
          {tag}
        </span>
      )}
      <b className="font-bold">{name}</b>
      <span className="text-[12.5px] font-semibold text-ink-3">{q}</span>
      {t && (
        <span className={`ml-auto whitespace-nowrap text-[11.5px] font-bold ${assigned ? "text-green" : "text-ink-3"}`}>
          {t}
        </span>
      )}
    </StaggerItem>
  );
}

function MatchBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  return (
    <div ref={ref} className="mb-3">
      <span className="text-[12px] font-bold text-ink-3">Matching buyers…</span>
      <div className="mt-[6px] h-[7px] overflow-hidden rounded-full bg-mist">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: "88%" } : {}}
          transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1], delay: 0.3 }}
          className="h-full rounded-full bg-gold"
        />
      </div>
    </div>
  );
}

export function FeatureRows() {
  return (
    <div className="mx-auto max-w-[1180px] px-6">
      {/* Row 1 — lead capture */}
      <div className="grid items-center gap-8 border-b border-line py-[54px] lg:grid-cols-2 lg:gap-16">
        <FeatureCopy
          icon={Users}
          iconBg="#FFF6D9"
          title="Capture every lead, from every channel"
          body="Portal inquiries, website forms, WhatsApp messages and walk-ins flow into one pipeline — auto-assigned to the right agent with a response-time clock running."
          subs={[
            { b: "Smart routing", s: "Round-robin or rule-based assignment, with alerts before a lead goes cold." },
            { b: "Automatic duplicate merge", s: "New inquiries are deduplicated against existing contacts — every client exists exactly once." },
          ]}
        />
        <Card title="Incoming leads" live>
          <Stagger gap={0.12}>
            <LeadRow tag="Portal" tone="b" name="Karim B." q="2BR · budget $450K" t="12s ago" />
            <LeadRow tag="WhatsApp" tone="g" name="Sara M." q="Villa · Palm District" t="1m ago" />
            <LeadRow tag="Website" tone="y" name="Omar D." q="Office · 200m²" t="4m ago" />
            <LeadRow tag="Portal" tone="b" name="Lina F." q="Studio · Downtown" t="→ Assigned to Rana" assigned />
          </Stagger>
        </Card>
      </div>

      {/* Row 2 — matching (flipped) */}
      <div className="grid items-center gap-8 border-b border-line py-[54px] lg:grid-cols-2 lg:gap-16">
        <div className="lg:order-2">
          <FeatureCopy
            icon={Building2}
            iconBg="#E9F6EE"
            title="One inventory, matched to real buyers"
            body="Listings live in one structured database — photos, documents, owner details, availability. When a property goes live, Proprt surfaces every buyer whose brief it fits, scored 0–100 across 7 weighted criteria."
            subs={[
              { b: "Smart buyer matching", s: "New listing in, ranked call-list out: budget, location, type and timeline all scored." },
              { b: "Viewings calendar", s: "Book, confirm and follow up viewings with reminders to client and agent." },
            ]}
          />
        </div>
        <div className="lg:order-1">
          <Card title="New listing · 3BR Bay Residences">
            <MatchBar />
            <Stagger gap={0.12}>
              <LeadRow name="Nadim R." q="Budget $800K · 3BR · Bay area" tag="96% match" tone="g" />
              <LeadRow name="Hala S." q="Budget $750K · 2–3BR" tag="91% match" tone="g" />
              <LeadRow name="Fadi K." q="Investor · yield-focused" tag="84% match" tone="y" />
            </Stagger>
          </Card>
        </div>
      </div>

      {/* Row 3 — commissions */}
      <div className="grid items-center gap-8 py-[54px] pb-0 lg:grid-cols-2 lg:gap-16">
        <FeatureCopy
          icon={Coins}
          iconBg="#EAF1FB"
          title="Close, split and report — without the spreadsheet"
          body="Move deals through offer to contract, auto-calculate commission splits per agent and branch, and give management a live view of revenue — not a month-old export."
          subs={[
            { b: "Commission engine", s: "Splits, referral fees and tiers calculated per deal, ready for payroll." },
            { b: "Owner & management reports", s: "Pipeline, conversion and agent performance dashboards, exportable in one click." },
          ]}
        />
        <Card title="Deal closed · Penthouse, The Crest">
          <div className="flex justify-between border-b border-mist py-[9px] text-[14px]">
            <span>Sale price</span>
            <b className="font-extrabold">$3,100,000</b>
          </div>
          <div className="flex justify-between border-b border-mist py-[9px] text-[14px]">
            <span>Agency commission (2%)</span>
            <b className="font-extrabold">$62,000</b>
          </div>
          <div className="my-4 mb-3 flex h-[14px] gap-[3px] overflow-hidden rounded-full">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
              className="origin-left rounded-full bg-gold"
              style={{ flex: 55 }}
            />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: 0.35 }}
              className="origin-left rounded-full bg-ink-2"
              style={{ flex: 35 }}
            />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: 0.5 }}
              className="origin-left rounded-full bg-[#C9C7BF]"
              style={{ flex: 10 }}
            />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] font-bold text-ink-2">
            <span className="flex items-center gap-[5px]">
              <i className="h-[9px] w-[9px] rounded-[3px] bg-gold" /> Agent · $34,100
            </span>
            <span className="flex items-center gap-[5px]">
              <i className="h-[9px] w-[9px] rounded-[3px] bg-ink-2" /> Agency · $21,700
            </span>
            <span className="flex items-center gap-[5px]">
              <i className="h-[9px] w-[9px] rounded-[3px] bg-[#C9C7BF]" /> Referral · $6,200
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
