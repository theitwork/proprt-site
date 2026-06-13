import {
  Home,
  MessageCircle,
  Mail,
  CalendarDays,
  Megaphone,
  Newspaper,
  CreditCard,
  Receipt,
  Table2,
  Zap,
  Map,
  KeyRound,
} from "lucide-react";
import { Stagger, StaggerItem } from "@/components/reveal";

const INTS = [
  { icon: Home, label: "Listing portals" },
  { icon: MessageCircle, label: "WhatsApp Business" },
  { icon: Mail, label: "Gmail & Outlook" },
  { icon: CalendarDays, label: "Google Calendar" },
  { icon: Megaphone, label: "Meta Lead Ads" },
  { icon: Newspaper, label: "Mailchimp" },
  { icon: CreditCard, label: "Stripe" },
  { icon: Receipt, label: "Zoho Books" },
  { icon: Table2, label: "Google Sheets" },
  { icon: Zap, label: "Zapier & webhooks" },
  { icon: Map, label: "Google Maps" },
  { icon: KeyRound, label: "SSO / Google login" },
];

export function IntegrationsGrid() {
  return (
    <Stagger gap={0.04} className="grid grid-cols-2 gap-[14px] md:grid-cols-4">
      {INTS.map((i) => (
        <StaggerItem
          key={i.label}
          className="flex items-center justify-center gap-[10px] rounded-xl border border-line bg-white px-[18px] py-4 text-center text-[14px] font-bold transition-all duration-200 hover:-translate-y-[3px] hover:border-gold-deep hover:shadow-soft"
        >
          <i.icon className="h-[18px] w-[18px] flex-none text-ink-2" strokeWidth={2} />
          {i.label}
        </StaggerItem>
      ))}
    </Stagger>
  );
}
