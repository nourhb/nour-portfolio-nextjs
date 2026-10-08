import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorHalo from "@/components/CursorHalo";
import RevealInit from "@/components/RevealInit";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nour El Houda Bouajila | Full-Stack Engineer in Hamilton",
  description:
    "Portfolio of Nour El Houda Bouajila — Full-Stack Engineer (React, Node.js, AWS, Docker) based in Hamilton, Ontario. 53 projects across web, WordPress, AI, cloud and DevOps.",
  keywords: ["Full-Stack Engineer", "React", "Node.js", "AWS", "WordPress", "Hamilton", "Portfolio"],
  authors: [{ name: "Nour El Houda Bouajila" }],
  openGraph: {
    title: "Nour El Houda Bouajila | Full-Stack Engineer",
    description: "53 projects across web, WordPress, AI, cloud and DevOps.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="ambient" aria-hidden="true" />
        <div
          className="ambient-blob"
          aria-hidden="true"
          style={{ width: 480, height: 480, left: "-8%", top: "6%", background: "#7137ff" }}
        />
        <div
          className="ambient-blob"
          aria-hidden="true"
          style={{ width: 560, height: 560, right: "-10%", top: "32%", background: "#ff5bd7", animationDelay: "-8s" }}
        />
        <div
          className="ambient-blob"
          aria-hidden="true"
          style={{ width: 420, height: 420, left: "32%", bottom: "-12%", background: "#41e8ef", animationDelay: "-14s" }}
        />
        <CursorHalo />
        <RevealInit />
        <Navbar />
        <div style={{ flex: 1 }}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
