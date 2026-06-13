"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

export type QA = { q: string; a: string };

export function Faq({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="mb-3 overflow-hidden rounded-[14px] border border-line bg-white">
            <button
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-[22px] py-[19px] text-left text-[15.5px] font-bold"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {item.q}
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className={`flex-none ${isOpen ? "text-gold-deep" : "text-ink-3"}`}
              >
                <Plus className="h-5 w-5" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="border-t border-mist px-[22px] py-4 pb-5 text-[14.5px] leading-[1.65] text-ink-2">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export const HOME_FAQ: QA[] = [
  {
    q: "How fast can we migrate from spreadsheets or another CRM?",
    a: "Most agencies are live within a week. We import your listings, contacts and open deals from Excel or your current CRM, map your pipeline stages, and train the team in one onboarding session. One-click sample data lets you explore a full working agency before you import anything.",
  },
  {
    q: "Does Proprt capture leads from listing portals automatically?",
    a: "Portal lead capture is part of the platform's lead-capture roadmap alongside webhooks and website inquiry forms. Inquiries from your own branded public site land in Proprt today — deduplicated against existing contacts and assigned by your routing rules.",
  },
  {
    q: "Can agents use it from their phones?",
    a: "Proprt is an installable, offline-aware PWA built mobile-first for agents in the field — update a deal after a viewing, log an activity, or check a buyer's brief from the car. Your branded icon sits on their home screen.",
  },
  {
    q: "How do commission splits work?",
    a: "Define split rules per agent, team or branch — including referral fees. Every closed deal calculates automatically and exports to a payroll-ready report.",
  },
  {
    q: "Is our data secure?",
    a: "Every agency is a fully isolated tenant, enforced by the database itself (Postgres Row-Level Security on every table). Four roles plus per-user permission overrides control who sees what, files live in per-agency isolated storage, and an audit log records sensitive actions. Accounts are invite-only.",
  },
  {
    q: "What does white-label actually include?",
    a: "Your logo, favicon, app icon, product name and currency — plus 9 editable color tokens, 7 ready themes, 11 color presets and 15 fonts. Your agents and your clients see your brand, from the sign-in screen to the public listings site.",
  },
];
