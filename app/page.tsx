import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Btn, Eyebrow, SectionHead } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { AppMock } from "@/components/app-mock";
import { TestimonialMarquee } from "@/components/marquee";
import { StackCompare } from "@/components/stack-compare";
import { FeatureRows } from "@/components/feature-rows";
import { AudienceCards } from "@/components/audiences";
import { AiAssistant } from "@/components/ai-assistant";
import { IntegrationsGrid } from "@/components/integrations";
import { Faq, HOME_FAQ } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { HeroHighlight } from "@/components/hero-highlight";
import { ScrollReveal } from "@/components/scroll-reveal";

const AVATARS = [
  { i: "RK", bg: "#FDE89A" },
  { i: "MS", bg: "#DCEDE3" },
  { i: "LH", bg: "#E8E3F6" },
  { i: "JA", bg: "#FBE3D6" },
  { i: "NT", bg: "#E0ECF8" },
];

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative bg-[radial-gradient(900px_420px_at_50%_-8%,rgba(253,211,59,0.22),transparent_65%),linear-gradient(180deg,#FFFDF6_0%,#fff_60%)] pb-20 pt-[150px]">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,rgba(0,0,0,0.5),transparent_70%)]" />
        <div className="relative z-[1] mx-auto flex max-w-[1180px] flex-col items-center px-6 text-center">
          <Reveal>
            <Link
              href="/tour"
              className="mb-[26px] inline-flex items-center gap-[9px] rounded-full border border-line-2 bg-white py-[7px] pl-2 pr-4 text-[13px] font-semibold text-ink-2 shadow-soft transition-colors hover:border-gold-deep"
            >
              <span className="rounded-full bg-gold px-[10px] py-[3px] text-[11.5px] font-extrabold text-ink">
                NEW
              </span>
              Take the guided product tour — 65 real screens
              <ArrowRight className="h-[14px] w-[14px] text-gold-deep" />
            </Link>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="max-w-[880px] text-[clamp(38px,6.2vw,68px)] font-extrabold leading-[1.06] tracking-[-0.028em]">
              The CRM your <HeroHighlight>real estate agency</HeroHighlight> actually runs on
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-[22px] mb-8 max-w-[640px] text-[clamp(16px,2vw,19px)] leading-[1.65] text-ink-2">
              Proprt brings listings, leads, viewings, deals and commissions into one white-label
              platform — so your agents stop juggling portals, spreadsheets and chat threads, and
              start closing.
            </p>
          </Reveal>

          <Reveal delay={0.18} className="flex flex-wrap justify-center gap-3">
            <Btn href="/contact" arrow>
              Book a demo
            </Btn>
            <Btn href="/tour" variant="ghost">
              Take the product tour
            </Btn>
          </Reveal>

          <Reveal delay={0.24} className="mt-[34px] flex items-center gap-[14px]">
            <span className="flex">
              {AVATARS.map((a, i) => (
                <span
                  key={a.i}
                  className={`grid h-[38px] w-[38px] place-items-center rounded-full border-[2.5px] border-white text-[12.5px] font-extrabold shadow-soft ${i > 0 ? "-ml-[9px]" : ""}`}
                  style={{ background: a.bg }}
                >
                  {a.i}
                </span>
              ))}
            </span>
            <span className="text-left text-[13.5px] leading-[1.4] text-ink-2">
              <span className="flex gap-[2px] text-gold-deep">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-[13px] w-[13px] fill-current" />
                ))}
              </span>
              Built with agencies across MENA
            </span>
          </Reveal>

          <AppMock />
        </div>
      </section>

      {/* ================= PROOF MARQUEE ================= */}
      <section className="overflow-hidden border-y border-line bg-mist py-[84px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <SectionHead
            eyebrow="Agencies on Proprt"
            title="Built with brokers, not for demos"
            sub="From two-agent boutiques to multi-branch brokerages — capture, qualify, present and close in one place."
          />
        </div>
        <TestimonialMarquee />
      </section>

      {/* ================= SCROLL REVEAL ================= */}
      <section className="py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <SectionHead
            eyebrow="A guided look"
            title="Every screen, revealed as you scroll"
            sub="Keep scrolling — the real product builds up in front of you, from the agency dashboard to a closed deal."
          />
        </div>
        <ScrollReveal />
      </section>

      {/* ================= STACK ================= */}
      <section className="py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <SectionHead
            eyebrow="One platform"
            title="Retire the spreadsheet-and-six-apps stack"
            sub="Most agencies run on a generic CRM, a listings sheet, portal inboxes, WhatsApp and a commission tracker that never agree with each other. Proprt replaces the lot."
          />
          <StackCompare />
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="border-t border-line bg-mist py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <SectionHead
            eyebrow="Built for the deal cycle"
            title="From first inquiry to signed contract"
            sub="Proprt is organized the way agencies actually work: capture the lead, match the property, run the viewing, close the deal, pay the agent."
          />
        </div>
        <FeatureRows />
      </section>

      {/* ================= AUDIENCES ================= */}
      <section className="py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <SectionHead
            eyebrow="Who it's for"
            title="One platform, every kind of agency"
            sub="Whether you run two agents or two branches, Proprt fits the way your team sells property."
          />
          <AudienceCards />
        </div>
      </section>

      {/* ================= AI ================= */}
      <AiAssistant />

      {/* ================= INTEGRATIONS ================= */}
      <section className="py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <SectionHead
            eyebrow="Integrations"
            title="Plays well with your existing tools"
            sub="Connect the portals, channels and back-office tools your agency already relies on — webhooks and lead capture built in."
          />
          <IntegrationsGrid />
          <Reveal className="mt-8 text-center">
            <Btn href="/contact" variant="ghost" arrow>
              Ask about an integration
            </Btn>
          </Reveal>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="scroll-mt-20 border-t border-line bg-mist py-24">
        <div className="mx-auto max-w-[820px] px-6">
          <SectionHead eyebrow="FAQ" title="Questions agencies ask us" />
          <Reveal>
            <Faq items={HOME_FAQ} />
          </Reveal>
          <p className="mt-7 text-center text-[14.5px] text-ink-2">
            Didn&rsquo;t find your answer?{" "}
            <Link href="/contact" className="border-b-2 border-gold font-bold">
              Talk to our team
            </Link>
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <CtaBand />
    </>
  );
}
