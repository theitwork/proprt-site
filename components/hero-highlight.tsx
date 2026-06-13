"use client";

import { motion } from "framer-motion";

/** Gold sweep highlight behind a phrase — animates in after load. */
export function HeroHighlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative whitespace-nowrap">
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        className="absolute inset-x-[-2%] bottom-[6%] -z-[1] h-[34%] origin-left rounded-md bg-gold"
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
