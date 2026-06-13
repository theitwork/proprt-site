"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

/** Local preview only — no backend. Submissions show a confirmation state. */
export function DemoForm() {
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-card border border-line bg-white p-7 shadow-mid sm:p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-10 text-center"
          >
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green" strokeWidth={1.6} />
            <h3 className="mb-2 text-[22px] font-extrabold">Request noted</h3>
            <p className="mx-auto max-w-[300px] text-[14.5px] leading-[1.6] text-ink-2">
              This is a local preview — the form isn&rsquo;t wired to a backend yet. In production
              this confirms the booking and emails both sides.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 cursor-pointer text-[14px] font-bold text-gold-deep"
            >
              Fill it again
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={false}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <h3 className="mb-1 text-[20px] font-extrabold">Book your demo</h3>
            <p className="mb-6 text-[13.5px] text-ink-3">Takes 30 seconds. We reply within a day.</p>

            <Field label="Full name" name="name" placeholder="Rana Khoury" required />
            <Field label="Work email" name="email" type="email" placeholder="rana@youragency.com" required />
            <Field label="Agency name" name="agency" placeholder="Khoury Properties" required />

            <label className="mb-4 block">
              <span className="mb-[6px] block text-[13px] font-bold">Team size</span>
              <select
                name="size"
                className="w-full cursor-pointer rounded-ctrl border border-line-2 bg-white px-4 py-3 text-[14.5px] font-semibold text-ink outline-none transition-colors focus:border-gold-deep"
                defaultValue="2-10"
              >
                <option value="1">Just me</option>
                <option value="2-10">2–10 agents</option>
                <option value="11-30">11–30 agents</option>
                <option value="31+">31+ agents / multi-branch</option>
              </select>
            </label>

            <label className="mb-6 block">
              <span className="mb-[6px] block text-[13px] font-bold">What should we focus on?</span>
              <textarea
                name="message"
                rows={3}
                placeholder="e.g. We're on spreadsheets and losing portal leads…"
                className="w-full resize-none rounded-ctrl border border-line-2 bg-white px-4 py-3 text-[14.5px] outline-none transition-colors placeholder:text-ink-3 focus:border-gold-deep"
              />
            </label>

            <button
              type="submit"
              className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-ctrl bg-gold px-6 py-[14px] text-[15px] font-bold text-ink shadow-gold transition-all duration-200 hover:-translate-y-px hover:bg-[#FFDC5C] active:scale-[0.98]"
            >
              Request the demo
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[3px]" />
            </button>
            <p className="mt-3 text-center text-[12px] font-semibold text-ink-3">
              No spam, no obligation. Want numbers? Ask — we&rsquo;ll include a tailored quote in
              our reply.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-[6px] block text-[13px] font-bold">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-ctrl border border-line-2 bg-white px-4 py-3 text-[14.5px] outline-none transition-colors placeholder:text-ink-3 focus:border-gold-deep"
      />
    </label>
  );
}
