import type { Metadata } from "next";
import { CalendarCheck, Database, Palette, ShieldCheck } from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { DemoForm } from "@/components/demo-form";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Book a live Proprt demo — a full working agency with sample data, your questions answered, your brand on the screen.",
};

const EXPECT = [
  {
    icon: CalendarCheck,
    t: "A 30-minute walkthrough",
    s: "Live, on your screen — the deal cycle from inquiry to commission.",
  },
  {
    icon: Database,
    t: "A real working agency",
    s: "One-click sample data: listings with photos, deals, contacts and tasks.",
  },
  {
    icon: Palette,
    t: "Your brand, applied live",
    s: "Watch the platform restyle to your logo and colors during the call.",
  },
  {
    icon: ShieldCheck,
    t: "Straight answers",
    s: "Security, migration, rollout — and a tailored proposal if you want numbers.",
  },
];

export default function ContactPage() {
  return (
    <section className="bg-[radial-gradient(900px_420px_at_50%_-8%,rgba(253,211,59,0.2),transparent_65%),linear-gradient(180deg,#FFFDF6_0%,#fff_60%)] pb-24 pt-[150px]">
      <div className="mx-auto grid max-w-[1180px] items-start gap-12 px-6 lg:grid-cols-[1fr_460px] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>Book a demo</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-[18px] max-w-[560px] text-[clamp(34px,4.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.025em]">
              See your agency running on Proprt
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-[520px] text-[17px] leading-[1.65] text-ink-2">
              No slideware. We&rsquo;ll show you the live product with a full sample agency loaded —
              and apply your brand while you watch.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {EXPECT.map((e, i) => (
              <Reveal key={e.t} delay={0.08 * i}>
                <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-gold-soft">
                  <e.icon className="h-5 w-5 text-ink" strokeWidth={2} />
                </div>
                <b className="mb-1 block text-[15.5px]">{e.t}</b>
                <span className="text-[14px] leading-[1.6] text-ink-2">{e.s}</span>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <DemoForm />
        </Reveal>
      </div>
    </section>
  );
}
