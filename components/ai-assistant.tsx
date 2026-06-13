"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useMotionPref } from "@/components/providers";
import { Check, Mic } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Eyebrow, Btn } from "@/components/ui";

const SPOKEN =
  "Showed Sara the Palm District villa — she loved it and wants to make an offer. Book a follow-up Thursday at 10 and send her the payment plan.";

const ACTIONS = [
  <>Viewing logged on <b className="text-white">Villa · Palm District</b></>,
  <>Deal moved to <b className="text-white">Offer</b></>,
  <>Task created: <b className="text-white">Send payment plan — Thu 10:00</b></>,
  <>Follow-up drafted to <b className="text-white">Sara M.</b></>,
];

export function AiAssistant() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = !useMotionPref().animate;
  const [typed, setTyped] = useState("");
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setTyped(SPOKEN);
      setShown(ACTIONS.length);
      return;
    }
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(SPOKEN.slice(0, i));
      if (i >= SPOKEN.length) {
        clearInterval(t);
        ACTIONS.forEach((_, n) => setTimeout(() => setShown(n + 1), 300 + n * 420));
      }
    }, 24);
    return () => clearInterval(t);
  }, [inView, reduced]);

  return (
    <section className="bg-ink py-24 text-white">
      <div className="mx-auto grid max-w-[1180px] items-center gap-9 px-6 lg:grid-cols-2 lg:gap-[60px]">
        <Reveal>
          <Eyebrow dark>Voice-first logging</Eyebrow>
          <h2 className="mt-[18px] mb-[14px] text-[clamp(30px,4.4vw,46px)] font-extrabold leading-[1.12] tracking-[-0.02em] text-white">
            Speak the update. Proprt does the admin.
          </h2>
          <p className="max-w-[620px] text-[17px] leading-[1.65] text-[#C9C7C2]">
            After a viewing, your agent records one update. Proprt logs the activity, updates the
            deal stage, books the follow-up and drafts the message — before the agent reaches the
            car.
          </p>
          <ul className="mt-[22px]">
            {[
              "Logs calls, viewings and notes automatically",
              "Creates tasks and follow-ups from plain speech",
              "Drafts client messages in your agency's tone",
            ].map((l) => (
              <li key={l} className="flex items-center gap-[11px] py-[9px] text-[15px] font-semibold text-[#E8E7E2]">
                <Check className="h-4 w-4 flex-none text-gold" strokeWidth={3} />
                {l}
              </li>
            ))}
          </ul>
          <Btn href="/contact" arrow className="mt-[26px]">
            See it in a live demo
          </Btn>
        </Reveal>

        <Reveal delay={0.08}>
          <div ref={ref} className="rounded-card border border-[#4B4A48] bg-[#3D3C3B] p-[22px] shadow-big">
            <div className="min-h-[96px] rounded-[14px] rounded-bl-[4px] bg-[#494846] px-[18px] py-4 text-[14.5px] leading-[1.6] text-[#F1F0EC]">
              <Mic className="mr-2 inline h-4 w-4 text-gold" />
              {typed}
              <span className="anim-caret ml-[2px] inline-block h-[15px] w-[2px] bg-gold align-middle" />
            </div>
            <div className="mt-4 flex flex-col gap-[9px]">
              {ACTIONS.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={shown > i ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className="rounded-[11px] border border-[#44584C] bg-[#34423A] px-[14px] py-[11px] text-[13.5px] text-[#DFF2E8]"
                >
                  <Check className="mr-[6px] inline h-[14px] w-[14px] text-[#6FD8A8]" strokeWidth={3} />
                  {a}
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
