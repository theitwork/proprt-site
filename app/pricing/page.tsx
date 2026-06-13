import { redirect } from "next/navigation";

/** Pricing is intentionally not public — quotes are tailored per agency.
 *  Old links land on the contact page. */
export default function PricingPage() {
  redirect("/contact");
}
