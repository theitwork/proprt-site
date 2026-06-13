import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Construction, KeyRound, UserRound, Check } from "lucide-react";
import { Eyebrow, Btn } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Proprt for brokerages, developers' sales teams, property managers and independent agents — one platform that fits the way each team sells property.",
};

const SOLUTIONS = [
  {
    id: "brokerages",
    icon: Building2,
    grad: "linear-gradient(135deg,#FFF3C9,#FDD33B)",
    title: "Brokerages",
    lead: "Run every branch from one pipeline.",
    body: "Multi-agent pipelines with record-level visibility — private, shared, co-agents and teams. Branch reporting, agent targets, commission control and a 24-criterion monitoring engine that flags problems before the month-end review does.",
    points: [
      "Teams, roles and per-user permission overrides",
      "Targets and team performance dashboards",
      "Commission splits per agent and branch",
      "White-label: your brand for agents and clients",
    ],
    shot: "team-performance.png",
    alt: "Team performance dashboard comparing agents and teams",
    focus: { pos: "50% 22%", zoom: 1.45 },
  },
  {
    id: "developers",
    icon: Construction,
    grad: "linear-gradient(135deg,#E3F6ED,#9FD9BC)",
    title: "Developers' sales teams",
    lead: "Launch-day chaos, organized.",
    body: "Structured inventory across ten property types holds the whole project — and when the inquiries surge, requests pipeline, smart matching and assignment rules keep every buyer brief owned and answered.",
    points: [
      "Bulk actions across large inventories",
      "Requests pipeline with six stages",
      "Smart matching: scored, ranked buyer lists",
      "Scheduled reports for the sales director",
    ],
    shot: "requests.png",
    alt: "Requests pipeline tracking buyer requirements by stage",
    focus: { pos: "40% 22%", zoom: 1.5 },
  },
  {
    id: "managers",
    icon: KeyRound,
    grad: "linear-gradient(135deg,#EAF1FB,#A9C6EE)",
    title: "Property managers",
    lead: "Sales and rentals, one system.",
    body: "Owners, tenants and rent contracts live beside the sales pipeline. Documents with expiry tracking, meetings, tasks and activity logs keep every property's paper trail in one place.",
    points: [
      "Rent management with contracts",
      "Owner and tenant contact types",
      "Document storage with expiry tracking",
      "Maps view across the managed portfolio",
    ],
    shot: "rent-management-contract.png",
    alt: "Rent management screen with an active rental contract",
    focus: { pos: "45% 28%", zoom: 1.45 },
  },
  {
    id: "independents",
    icon: UserRound,
    grad: "linear-gradient(135deg,#F6ECFA,#D4B3E8)",
    title: "Independent agents",
    lead: "Look like a firm. Move like one.",
    body: "A branded public website, polished client showcases and a professional pipeline — without an office manager. The installable app keeps everything in your pocket, and one-click sample data shows you the ropes.",
    points: [
      "Your own branded listings website",
      "Customer View presentations & compare",
      "WhatsApp templates that sound like you",
      "Installable PWA — works on the go",
    ],
    shot: "customer-view-comapre.png",
    alt: "Side-by-side property comparison for buyers",
    focus: { pos: "50% 30%", zoom: 1.35 },
  },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="bg-[radial-gradient(900px_420px_at_50%_-8%,rgba(253,211,59,0.2),transparent_65%),linear-gradient(180deg,#FFFDF6_0%,#fff_60%)] pb-12 pt-[150px]">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center px-6 text-center">
          <Reveal>
            <Eyebrow>Solutions</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-[18px] max-w-[820px] text-[clamp(36px,5.4vw,60px)] font-extrabold leading-[1.08] tracking-[-0.025em]">
              One platform, every kind of agency
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-[620px] text-[17px] leading-[1.65] text-ink-2">
              The same product wears four different hats — because a two-agent boutique and a
              multi-branch brokerage don&rsquo;t sell property the same way.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-[1180px] px-6">
          {SOLUTIONS.map((s, i) => (
            <div
              key={s.id}
              id={s.id}
              className="grid scroll-mt-24 items-center gap-8 border-b border-line py-[54px] last:border-b-0 lg:grid-cols-2 lg:gap-16"
            >
              <Reveal className={i % 2 ? "lg:order-2" : ""}>
                <span
                  className="mb-5 grid h-[52px] w-[52px] place-items-center rounded-[14px]"
                  style={{ background: s.grad }}
                >
                  <s.icon className="h-6 w-6 text-ink" strokeWidth={1.8} />
                </span>
                <h2 className="mb-1 text-[clamp(24px,2.8vw,32px)] font-extrabold leading-[1.16] tracking-[-0.02em]">
                  {s.title}
                </h2>
                <p className="mb-3 text-[16px] font-bold text-gold-deep">{s.lead}</p>
                <p className="mb-5 text-[15.5px] leading-[1.65] text-ink-2">{s.body}</p>
                <ul className="grid gap-[9px]">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-[10px] text-[14.5px] font-semibold">
                      <Check className="h-4 w-4 flex-none text-gold-deep" strokeWidth={3} />
                      {p}
                    </li>
                  ))}
                </ul>
                <Btn href="/contact" arrow className="mt-7 !px-5 !py-[11px] !text-[14px]">
                  See it for your team
                </Btn>
              </Reveal>
              <Reveal delay={0.08} className={i % 2 ? "lg:order-1" : ""}>
                <div className="overflow-hidden rounded-[18px] border border-line bg-white shadow-mid">
                  <div className="flex items-center gap-2 border-b border-line bg-mist px-4 py-[9px]">
                    <span className="h-[9px] w-[9px] rounded-full bg-[#F6C9C4]" />
                    <span className="h-[9px] w-[9px] rounded-full bg-[#F6E3B4]" />
                    <span className="h-[9px] w-[9px] rounded-full bg-[#CBE7D2]" />
                    <span className="ml-2 truncate text-[11px] text-ink-3">company.proprt.app</span>
                  </div>
                  <div className="relative aspect-[16/9.6] overflow-hidden">
                    <Image
                      src={`/screens/${s.shot}`}
                      alt={s.alt}
                      fill
                      unoptimized
                      loading={i === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 1024px) 100vw, 1120px"
                      className="object-cover"
                      style={{
                        objectPosition: s.focus.pos,
                        transform: `scale(${s.focus.zoom})`,
                        transformOrigin: s.focus.pos,
                      }}
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
