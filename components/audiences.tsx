import Link from "next/link";
import { ArrowRight, Building2, Construction, KeyRound, UserRound } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/reveal";

export const AUDIENCES = [
  {
    id: "brokerages",
    icon: Building2,
    grad: "linear-gradient(135deg,#FFF3C9,#FDD33B)",
    title: "Brokerages",
    blurb: "Multi-agent pipelines, branch reporting and commission control in one view.",
  },
  {
    id: "developers",
    icon: Construction,
    grad: "linear-gradient(135deg,#E3F6ED,#9FD9BC)",
    title: "Developers' sales teams",
    blurb: "Off-plan inventory, unit availability and launch-day lead surges handled cleanly.",
  },
  {
    id: "managers",
    icon: KeyRound,
    grad: "linear-gradient(135deg,#EAF1FB,#A9C6EE)",
    title: "Property managers",
    blurb: "Owners, tenants, rent contracts and renewals tracked alongside sales.",
  },
  {
    id: "independents",
    icon: UserRound,
    grad: "linear-gradient(135deg,#F6ECFA,#D4B3E8)",
    title: "Independent agents",
    blurb: "A professional system that makes a one-person operation feel like a firm.",
  },
];

export function AudienceCards() {
  return (
    <Stagger gap={0.08} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {AUDIENCES.map((a) => (
        <StaggerItem key={a.id}>
          <Link
            href={`/solutions#${a.id}`}
            className="group flex h-full cursor-pointer flex-col rounded-card border border-line bg-white p-[18px] transition-all duration-200 hover:-translate-y-[5px] hover:border-gold-deep hover:shadow-mid"
          >
            <span
              className="mb-4 grid h-[120px] place-items-center rounded-xl"
              style={{ background: a.grad }}
            >
              <a.icon className="h-10 w-10 text-ink" strokeWidth={1.6} />
            </span>
            <h4 className="mb-[7px] text-[17px] font-extrabold">{a.title}</h4>
            <p className="flex-1 text-[13.5px] leading-[1.55] text-ink-2">{a.blurb}</p>
            <span className="mt-4 inline-flex items-center gap-[6px] text-[13px] font-bold">
              Explore
              <ArrowRight className="h-[13px] w-[13px] transition-transform duration-200 group-hover:translate-x-[3px]" />
            </span>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
