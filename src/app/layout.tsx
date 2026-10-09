import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { getSiteUrl, homeDescription, person } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
});

const description = homeDescription();
const title = `${person.name} | Full-Stack Engineer in Hamilton`;

export const viewport: Viewport = {
  themeColor: "#07051a",
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: title,
    template: `%s | ${person.name}`,
  },
  description,
  applicationName: person.name,
  authors: [{ name: person.name, url: person.linkedin }],
  creator: person.name,
  keywords: [
    "Nour El Houda Bouajila",
    "full-stack engineer",
    "Hamilton",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "WordPress",
    "WooCommerce",
    "AWS",
    "AI",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_CA",
    url: "/",
    siteName: person.name,
    images: [{ url: "/assets/portrait-main.png", alt: `Portrait of ${person.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/portrait-main.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${bricolage.variable}`}>
      <body>{children}</body>
    </html>
  );
}
