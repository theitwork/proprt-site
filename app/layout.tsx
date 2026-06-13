import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BASE_PATH } from "@/lib/base-path";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Proprt — The Real Estate CRM Built for Agencies",
    template: "%s · Proprt",
  },
  description:
    "Proprt brings listings, leads, deals, marketing and commissions into one platform built for real estate agencies. Capture every lead, match buyers to inventory, and close faster.",
  icons: {
    icon: [{ url: `${BASE_PATH}/brand/favicon-32.png`, sizes: "32x32", type: "image/png" }],
    apple: `${BASE_PATH}/brand/proprt-app-icon-180.png`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans">
        <Providers>
          <Nav />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
