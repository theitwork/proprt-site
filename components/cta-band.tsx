import { Reveal } from "@/components/reveal";
import { Btn, Pin } from "@/components/ui";

export function CtaBand({
  title = (
    <>
      Ready to run your agency
      <br />
      on one platform?
    </>
  ),
  sub = "Book a demo, load one-click sample data, and walk through a full working agency — your brand on every screen.",
}: {
  title?: React.ReactNode;
  sub?: string;
}) {
  return (
    <section className="py-[110px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal className="dot-grid relative overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#FFE584,#FDD33B_55%,#F4C322)] px-8 py-[72px] text-center shadow-mid">
          <Pin className="mx-auto mb-[18px] h-[46px] w-[46px]" />
          <h2 className="text-[clamp(30px,4.4vw,46px)] font-extrabold leading-[1.12] tracking-[-0.02em]">
            {title}
          </h2>
          <p className="mx-auto mt-[14px] mb-[30px] max-w-[620px] text-[17px] leading-[1.65] text-ink-2">
            {sub}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Btn href="/contact" variant="ink" arrow>
              Book a demo
            </Btn>
            <Btn href="/tour" variant="ghost" className="!border-ink/30 !bg-transparent">
              Take the product tour
            </Btn>
          </div>
          <p className="mt-[18px] text-[12.5px] font-semibold text-ink-2">
            Guided onboarding · Your data imported · White-label from day one
          </p>
        </Reveal>
      </div>
    </section>
  );
}
