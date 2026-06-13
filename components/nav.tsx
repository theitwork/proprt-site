"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ArrowUp } from "lucide-react";
import { Btn } from "@/components/ui";
import { BASE_PATH } from "@/lib/base-path";

const LINKS = [
  { href: "/product", label: "Product" },
  { href: "/tour", label: "Tour" },
  { href: "/solutions", label: "Solutions" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 10);
    // On desktop the bar tucks away once you scroll down; the Top button
    // brings you back up to reveal it again. Stays put while the mobile menu
    // is open so the close control never disappears.
    setHidden(y > 240 && !open);
  });

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-all duration-300 ${
        scrolled
          ? "border-line bg-white/80 shadow-[0_6px_24px_rgba(51,50,50,0.06)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      } ${hidden ? "md:-translate-y-full md:opacity-0" : "md:translate-y-0 md:opacity-100"}`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center gap-8 px-6">
        <Link href="/" className="flex items-center" aria-label="Proprt home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${BASE_PATH}/brand/proprt-logo.svg`} alt="Proprt" className="h-9 w-auto" />
        </Link>

        <nav className="hidden flex-1 gap-1 md:flex" aria-label="Main">
          {LINKS.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-[9px] px-[14px] py-[9px] text-[14.5px] font-semibold transition-colors ${
                  active ? "text-ink" : "text-ink-2 hover:bg-mist hover:text-ink"
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-px h-[2.5px] rounded-full bg-gold"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Btn href="/contact" arrow className="hidden !px-[18px] !py-[10px] !text-[14px] md:inline-flex">
            Book a demo
          </Btn>
          <button
            className="grid h-[42px] w-[42px] cursor-pointer place-items-center rounded-[10px] text-ink md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-white shadow-big md:hidden"
          >
            <div className="px-6 py-4">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-mist px-1 py-[13px] text-[16px] font-semibold"
                >
                  {l.label}
                </Link>
              ))}
              <Btn href="/contact" arrow className="mt-4 w-full justify-center" >
                Book a demo
              </Btn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

      {/* Desktop-only back-to-top, shown once the nav has tucked away */}
      <AnimatePresence>
        {hidden && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-5 left-5 z-[120] hidden cursor-pointer items-center gap-2 rounded-full border border-line-2 bg-white/90 px-4 py-[10px] text-[13px] font-bold text-ink shadow-mid backdrop-blur-md transition-colors hover:border-gold-deep md:flex"
          >
            <ArrowUp className="h-[15px] w-[15px] text-gold-deep" />
            Top
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
