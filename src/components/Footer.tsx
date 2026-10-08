import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="mt-24"
      style={{ borderTop: "1px solid var(--line)", background: "rgba(4,2,16,0.55)" }}
    >
      <div className="wrap py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="nav-brand" aria-label="Home">
          <span className="grad-text" style={{ fontSize: 26, fontWeight: 800 }}>N</span>
          <span style={{ fontSize: 12, color: "var(--faint)", marginLeft: 10 }}>
            © 2026 Nour El Houda Bouajila
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-bold" style={{ color: "var(--muted)" }}>
          <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <a href="mailto:nourhb58@gmail.com" className="hover:text-white transition-colors">Email</a>
          <a
            href="https://github.com/nourhb"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
