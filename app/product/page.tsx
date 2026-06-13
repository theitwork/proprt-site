import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2,
  Users,
  KanbanSquare,
  Presentation,
  Workflow,
  BarChart3,
  ShieldCheck,
  Palette,
} from "lucide-react";
import { Eyebrow, SectionHead, Btn } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { CountUp } from "@/components/count-up";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Everything an agency runs on: photo-rich inventory, smart buyer matching, client showcases, deals, automation, team performance and white-label branding.",
};

const MODULES = [
  {
    id: "listings",
    icon: Building2,
    iconBg: "#FFF6D9",
    eyebrow: "Inventory",
    title: "Photo-rich inventory, built for property",
    body: "Ten property types, each with its own structured form — apartments, villas, land, offices and more — plus a 58-item amenity catalog, drag-and-drop photo manager, price history and region-specific specs. Publish any listing to your branded public website in one click.",
    points: ["Type-specific forms & specs", "Photo manager with cover & reorder", "Bulk re-assign and re-status", "One-click publish to your public site"],
    shot: "properties-light.png",
    alt: "Proprt inventory grid with photo-rich listing cards and status badges",
    focus: { pos: "62% 50%", zoom: 1.45 },
  },
  {
    id: "leads",
    icon: Users,
    iconBg: "#E9F6EE",
    eyebrow: "Demand",
    title: "Every buyer brief, captured and matched",
    body: "Contacts with eight types and automatic duplicate merge. Requests move through a six-stage pipeline — and every listing surfaces its matching buyers, scored 0–100 across seven weighted criteria.",
    points: ["Contacts CRM with dedupe & merge", "Requests pipeline: new → won", "Smart matching, ranked call-lists", "Activities, meetings and tasks in context"],
    shot: "property-details-matching-leads.png",
    alt: "Matching leads panel showing scored buyer matches for a listing",
    focus: { pos: "28% 22%", zoom: 1.6 },
  },
  {
    id: "showcase",
    icon: Presentation,
    iconBg: "#EAF1FB",
    eyebrow: "Selling",
    title: "Present like the biggest firm in town",
    body: "Build a client showcase in seconds, present it full-screen in the meeting, and compare properties side by side to help buyers decide. Deals track value, probability and commission to the close.",
    points: ["Customer View showcase builder", "Full-screen present mode", "Side-by-side compare", "Deals board with weighted forecast"],
    shot: "customer-view-present.png",
    alt: "Customer View present mode showing a polished client-facing property presentation",
    focus: { pos: "72% 28%", zoom: 1.25 },
  },
  {
    id: "automation",
    icon: Workflow,
    iconBg: "#F6ECFA",
    eyebrow: "Automation",
    title: "The busywork runs itself",
    body: "No-code workflows turn triggers into actions — with a built-in simulator to test rules before they go live. WhatsApp templates send on-brand messages in seconds, and a 24-criterion monitoring engine watches team performance for you.",
    points: ["Trigger → action workflow builder", "WhatsApp template library", "24-criterion team monitoring & alerts", "Notifications that keep everyone honest"],
    shot: "workflow-new-workflow.png",
    alt: "Workflow builder creating a trigger-to-action automation rule",
    focus: { pos: "50% 28%", zoom: 1.35 },
  },
  {
    id: "finance",
    icon: BarChart3,
    iconBg: "#E3F6ED",
    eyebrow: "Money & insight",
    title: "Commissions, rent and reports that agree",
    body: "Commission tracking with per-agent splits, rent contracts managed end-to-end, an in-app calculator for scenarios, and cross-business reports — custom-built and delivered on a schedule.",
    points: ["Commission engine with splits", "Rent management & contracts", "Custom + scheduled reports", "Targets: goals vs. actuals per agent"],
    shot: "reports.png",
    alt: "Reports dashboard with charts and KPIs across the business",
    focus: { pos: "48% 22%", zoom: 1.5 },
  },
  {
    id: "security",
    icon: ShieldCheck,
    iconBg: "#FBEFE3",
    eyebrow: "Trust",
    title: "Isolated by the database, not by promises",
    body: "Every agency is a fully isolated tenant enforced with Postgres Row-Level Security on every table. Four roles plus a platform Super-Admin, per-user permission overrides, isolated file storage, audit logging and invite-only provisioning.",
    points: ["Row-Level Security on every table", "4 roles + per-user overrides", "Per-agency isolated file storage", "Audit log & guarded admin actions"],
    shot: "administration.png",
    alt: "Administration area with organized settings sections",
    focus: { pos: "50% 25%", zoom: 1.35 },
  },
  {
    id: "whitelabel",
    icon: Palette,
    iconBg: "#FFF6D9",
    eyebrow: "White-label",
    title: "Your brand on every screen",
    body: "Logo, favicon, app icon, product name and currency per agency — with 9 editable color tokens, 7 ready themes, 11 color presets and 15 fonts. From the sign-in screen to the installable PWA to your public listings site.",
    points: ["9 color tokens · 7 themes · 15 fonts", "Branded sign-in & app icon", "Installable, offline-aware PWA", "A public listings website per agency"],
    shot: "login-page.png",
    alt: "Branded sign-in screen showing white-label logo and colors",
    focus: { pos: "50% 38%", zoom: 1.3 },
  },
];

const STATS = [
  { v: 25, suffix: "", label: "Feature modules" },
  { v: 65, suffix: "", label: "Real product screens" },
  { v: 45, suffix: "", label: "Admin settings areas" },
  { v: 100, suffix: "%", label: "Tenant isolation" },
];

export default function ProductPage() {
  return (
    <>
      <section className="bg-[radial-gradient(900px_420px_at_50%_-8%,rgba(253,211,59,0.2),transparent_65%),linear-gradient(180deg,#FFFDF6_0%,#fff_60%)] pb-16 pt-[150px]">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center px-6 text-center">
          <Reveal>
            <Eyebrow>The platform</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-[18px] max-w-[860px] text-[clamp(36px,5.4vw,60px)] font-extrabold leading-[1.08] tracking-[-0.025em]">
              Everything an agency runs on, in one product
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-[640px] text-[17px] leading-[1.65] text-ink-2">
              Twenty-five modules that share one database, one pipeline and one brand — yours.
            </p>
          </Reveal>
          <Stagger className="mt-12 grid w-full max-w-[880px] grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-4">
            {STATS.map((s) => (
              <StaggerItem key={s.label} className="bg-white px-6 py-5">
                <b className="block text-[clamp(26px,3vw,36px)] font-extrabold tracking-[-0.02em] text-ink">
                  <CountUp to={s.v} suffix={s.suffix} />
                </b>
                <span className="text-[13px] font-semibold text-ink-3">{s.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-line py-10">
        <div className="mx-auto max-w-[1180px] px-6">
          {MODULES.map((m, i) => (
            <div
              key={m.id}
              id={m.id}
              className="grid scroll-mt-24 items-center gap-8 border-b border-line py-[54px] last:border-b-0 lg:grid-cols-2 lg:gap-16"
            >
              <Reveal className={i % 2 ? "lg:order-2" : ""}>
                <div className="mb-5 grid h-[52px] w-[52px] place-items-center rounded-[14px]" style={{ background: m.iconBg }}>
                  <m.icon className="h-6 w-6 text-ink" strokeWidth={2} />
                </div>
                <span className="text-[12.5px] font-extrabold uppercase tracking-[0.1em] text-gold-deep">
                  {m.eyebrow}
                </span>
                <h2 className="mt-2 mb-[13px] text-[clamp(24px,2.8vw,32px)] font-extrabold leading-[1.16] tracking-[-0.02em]">
                  {m.title}
                </h2>
                <p className="mb-5 text-[15.5px] leading-[1.65] text-ink-2">{m.body}</p>
                <ul className="grid gap-[9px]">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-center gap-[10px] text-[14.5px] font-semibold text-ink">
                      <span className="h-[7px] w-[7px] flex-none rounded-full bg-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.08} className={i % 2 ? "lg:order-1" : ""}>
                <div className="overflow-hidden rounded-[18px] border border-line bg-white shadow-mid transition-transform duration-300 hover:scale-[1.015]">
                  <div className="flex items-center gap-2 border-b border-line bg-mist px-4 py-[9px]">
                    <span className="h-[9px] w-[9px] rounded-full bg-[#F6C9C4]" />
                    <span className="h-[9px] w-[9px] rounded-full bg-[#F6E3B4]" />
                    <span className="h-[9px] w-[9px] rounded-full bg-[#CBE7D2]" />
                    <span className="ml-2 truncate text-[11px] text-ink-3">company.proprt.app</span>
                  </div>
                  <div className="relative aspect-[16/9.6] overflow-hidden">
                    <Image
                      src={`/screens/${m.shot}`}
                      alt={m.alt}
                      fill
                      unoptimized
                      loading={i === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 1024px) 100vw, 1120px"
                      className="object-cover"
                      style={{
                        objectPosition: m.focus.pos,
                        transform: `scale(${m.focus.zoom})`,
                        transformOrigin: m.focus.pos,
                      }}
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-mist py-20 text-center">
        <div className="mx-auto max-w-[1180px] px-6">
          <SectionHead
            eyebrow="See everything"
            title="Sixty-five screens say it better"
            sub="The guided tour walks the whole platform, module by module."
          />
          <Reveal>
            <Btn href="/tour" arrow>
              Take the product tour
            </Btn>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
