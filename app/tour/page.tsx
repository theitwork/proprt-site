import type { Metadata } from "next";
import { SectionHead, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ScrollShowcase } from "@/components/scroll-showcase";
import { Gallery } from "@/components/gallery";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Product tour",
  description:
    "Scroll through the Proprt platform — 65 real screens across dashboards, inventory, matching, deals, automation, reporting and administration.",
};

export default function TourPage() {
  return (
    <>
      <section className="bg-[radial-gradient(900px_420px_at_50%_-8%,rgba(253,211,59,0.2),transparent_65%),linear-gradient(180deg,#FFFDF6_0%,#fff_60%)] pb-6 pt-[150px]">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center px-6 text-center">
          <Reveal>
            <Eyebrow>The guided tour</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-[18px] max-w-[820px] text-[clamp(36px,5.4vw,60px)] font-extrabold leading-[1.08] tracking-[-0.025em]">
              Keep scrolling. The product does the talking.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-[620px] text-[17px] leading-[1.65] text-ink-2">
              Every screen below is the real platform — no mockups. Six highlights first, then the
              full gallery of 65 screens.
            </p>
          </Reveal>
        </div>
      </section>

      <ScrollShowcase />

      <section className="border-t border-line bg-mist py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <SectionHead
            eyebrow="The full gallery"
            title="All 65 screens, module by module"
            sub="Click any screen to zoom. Arrow keys to browse."
          />
          <Gallery />
        </div>
      </section>

      <CtaBand
        title={
          <>
            Want this walkthrough live,
            <br />
            with your data?
          </>
        }
      />
    </>
  );
}
