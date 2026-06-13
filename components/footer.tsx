import Link from "next/link";
import { Btn } from "@/components/ui";
import { BASE_PATH } from "@/lib/base-path";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Leads & pipeline", href: "/product#leads" },
      { label: "Listings & matching", href: "/product#listings" },
      { label: "Commissions", href: "/product#finance" },
      { label: "Automation & AI", href: "/product#automation" },
      { label: "Product tour", href: "/tour" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Brokerages", href: "/solutions#brokerages" },
      { label: "Developer sales teams", href: "/solutions#developers" },
      { label: "Property managers", href: "/solutions#managers" },
      { label: "Independent agents", href: "/solutions#independents" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Book a demo", href: "/contact" },
      { label: "Get a tailored quote", href: "/contact" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "White-label", href: "/solutions#brokerages" },
      { label: "Security", href: "/product#security" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-[72px] text-[#CFCEC9]">
      <div className="relative z-[1] mx-auto grid max-w-[1180px] grid-cols-2 gap-9 px-6 md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="mb-[14px] inline-block" aria-label="Proprt home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${BASE_PATH}/brand/proprt-logo-reversed.svg`} alt="Proprt" className="h-9 w-auto" />
          </Link>
          <p className="mb-5 max-w-[280px] text-[14px] leading-[1.6]">
            The real estate CRM built for agencies — listings, leads, deals and commissions in one
            place.
          </p>
          <Btn href="/contact" className="!px-[18px] !py-[10px] !text-[13.5px]">
            Book a free demo
          </Btn>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <b className="mb-[14px] block text-[13.5px] uppercase tracking-[0.07em] text-white">
              {c.title}
            </b>
            {c.links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="block py-[5px] text-[14px] text-[#B8B7B2] transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="relative z-[1] mt-[54px] border-t border-[#464543] py-[22px] text-[13px]">
        <div className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-2 px-6">
          <span>© 2026 Proprt. All rights reserved. Local preview — not a public site.</span>
          <span>
            Built by <b className="text-gold">The IT WORK</b>
          </span>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[58px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[clamp(120px,22vw,260px)] font-extrabold leading-none tracking-[-0.04em] text-white/[0.035]"
      >
        Proprt
      </div>
    </footer>
  );
}
