import type { Metadata, Viewport } from "next";
import "./globals.css";
import PageAnimations from "@/components/PageAnimations";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#9aa5b6",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://127.0.0.1:3000"),
  title: "Marthe & Deivi | 04.09.27",
  description: "We invite you to join us on our wedding day. September 4, 2027.",
  referrer: "no-referrer",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website", title: "Marthe & Deivi | 04.09.27",
    description: "See you in September? You're invited to our wedding.",
    images: [{ url: "/images/invitation-envelope.png", width: 1847, height: 1038, alt: "See you in September? Cream wedding envelope with swans." }],
  },
  twitter: { card: "summary_large_image", title: "Marthe & Deivi | 04.09.27", images: ["/images/invitation-envelope.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<PageAnimations /></body></html>;
}
