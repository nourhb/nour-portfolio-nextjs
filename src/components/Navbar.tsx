"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav">
      <Link href="/" className="nav-brand" aria-label="Nour El Houda Bouajila — home">
        Nour<span className="grad-text">.</span>
      </Link>

      <nav className="nav-links hidden md:flex" aria-label="Primary">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={pathname === l.href ? "active" : ""}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href="/contact"
          className="button primary hidden md:inline-flex"
          style={{ padding: "11px 22px", fontSize: 13 }}
        >
          Let&apos;s work <span aria-hidden="true">↗</span>
        </Link>
        <button
          className="filter-btn md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav
          className="md:hidden absolute top-full left-4 right-4 mt-2 p-3"
          style={{
            borderRadius: 18,
            border: "1px solid var(--line-strong)",
            background: "var(--surface-2)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 24px 60px var(--shadow)",
          }}
          aria-label="Mobile"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-bold"
              style={{ color: pathname === l.href ? "#fff" : "var(--muted)" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
