import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

/** The official Proprt pin mark (transparent, self-contained — works on light & dark). */
export function Pin({ className = "h-[30px] w-[30px]" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/proprt-icon.svg" alt="" aria-hidden="true" className={`object-contain ${className}`} />;
}

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-[7px] text-[13px] font-bold uppercase tracking-[0.08em] ${
        dark
          ? "border-gold/30 bg-gold/10 text-gold"
          : "border-[#F4E1A0] bg-gold-soft text-ink-2"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${dark ? "bg-gold" : "bg-gold-deep"}`} />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-[18px] mb-[14px] text-[clamp(30px,4.4vw,46px)] font-extrabold leading-[1.12] tracking-[-0.02em] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`max-w-[620px] text-[17px] leading-[1.65] ${dark ? "text-[#C9C7C2]" : "text-ink-2"}`}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}

type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "ink" | "ghost";
  arrow?: boolean;
  className?: string;
};

export function Btn({ href, children, variant = "gold", arrow = false, className = "" }: BtnProps) {
  const base =
    "group inline-flex cursor-pointer items-center gap-2 rounded-ctrl border px-6 py-[13px] text-[15px] font-bold transition-all duration-200 active:scale-[0.97]";
  const styles = {
    gold: "border-transparent bg-gold text-ink shadow-gold hover:-translate-y-px hover:bg-[#FFDC5C]",
    ink: "border-transparent bg-ink text-white hover:-translate-y-px hover:bg-[#1F1E1E]",
    ghost: "border-line-2 bg-white text-ink hover:-translate-y-px hover:border-ink-3",
  }[variant];
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[3px]" />
      )}
    </Link>
  );
}
