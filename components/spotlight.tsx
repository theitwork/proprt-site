import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { screenSrc, SCREEN_ASPECT } from "@/lib/screens";

const SPOTLIGHT = [
  {
    file: "property-details-overview-1.png",
    title: "The full property details page",
    body: "Pricing, specs, media, history and the buyers it matches — one complete, shareable view per listing.",
  },
  {
    file: "customer-view-comapre.png",
    title: "Compare properties side by side",
    body: "Put a buyer's shortlist next to each other — price, size and specs aligned — so they decide faster.",
  },
  {
    file: "property-details-published.png",
    title: "Published listing, live on your site",
    body: "One click turns any listing into a polished, client-facing page on your own branded website.",
  },
];

export function Spotlight() {
  return (
    <div className="grid gap-7 md:grid-cols-3">
      {SPOTLIGHT.map((s, i) => (
        <Reveal key={s.file} delay={i * 0.08}>
          <article className="group h-full">
            <div className="overflow-hidden rounded-[18px] border border-line bg-white shadow-mid transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-big">
              <div className="flex items-center gap-2 border-b border-line bg-mist px-4 py-[9px]">
                <span className="h-[9px] w-[9px] rounded-full bg-[#F6C9C4]" />
                <span className="h-[9px] w-[9px] rounded-full bg-[#F6E3B4]" />
                <span className="h-[9px] w-[9px] rounded-full bg-[#CBE7D2]" />
                <span className="ml-2 truncate text-[11px] text-ink-3">company.proprt.app</span>
              </div>
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: SCREEN_ASPECT }}>
                <Image
                  src={screenSrc(s.file)}
                  alt={s.title}
                  fill
                  unoptimized
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.015]"
                />
              </div>
            </div>
            <h3 className="mt-4 text-[18px] font-extrabold leading-[1.25] tracking-[-0.02em]">
              {s.title}
            </h3>
            <p className="mt-1.5 text-[14.5px] leading-[1.6] text-ink-2">{s.body}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
