import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Nour El Houda Bouajila | Full-Stack Engineer in Hamilton",
  description:
    "Explore 45 web, AI, cloud, analytics and WordPress projects by Nour El Houda Bouajila, a full-stack engineer based in Hamilton, Ontario.",
  authors: [{ name: "Nour El Houda Bouajila" }],
  openGraph: {
    title: "Nour El Houda Bouajila | Full-Stack Engineer in Hamilton",
    description:
      "Explore 45 web, AI, cloud, analytics and WordPress projects by Nour El Houda Bouajila, a full-stack engineer based in Hamilton, Ontario.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nour El Houda Bouajila | Full-Stack Engineer in Hamilton",
    description:
      "Explore 45 web, AI, cloud, analytics and WordPress projects by Nour El Houda Bouajila, a full-stack engineer based in Hamilton, Ontario.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${bricolage.variable}`}>
      <body>{children}</body>
    </html>
  );
}
