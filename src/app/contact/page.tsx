import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Nour El Houda Bouajila",
  description: "Get in touch with Nour El Houda Bouajila — full-stack engineer in Hamilton, Ontario.",
};

const rows = [
  { label: "Email", value: "nourhb58@gmail.com", href: "mailto:nourhb58@gmail.com" },
  { label: "GitHub", value: "github.com/nourhb", href: "https://github.com/nourhb" },
  { label: "LinkedIn", value: "Nour El Houda Bouajila", href: "https://www.linkedin.com/in/nour-el-houda-bouajila" },
  { label: "Based in", value: "Hamilton, Ontario · Canada", href: undefined },
];

export default function ContactPage() {
  return (
    <main className="wrap" style={{ paddingTop: 150, paddingBottom: 40 }}>
      <section style={{ display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,0.9fr)", gap: 48, alignItems: "center" }} className="contact-grid">
        <div>
          <span className="kicker reveal">Contact</span>
          <h1 className="section-title reveal" style={{ marginTop: 18 }}>
            Let&apos;s make
            <br />
            something
            <br />
            <span className="grad-text">matter.</span>
          </h1>
          <p className="reveal" style={{ color: "var(--muted)", maxWidth: 480, lineHeight: 1.75, marginTop: 24 }}>
            Have a product to launch, a system to untangle or a WordPress experience that needs
            more ambition? Tell me where you want to go.
          </p>
          <div className="reveal" style={{ marginTop: 48 }}>
            {rows.map((r) => (
              <div key={r.label} className="contact-row">
                <span className="contact-label">{r.label}</span>
                {r.href ? (
                  <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="contact-value">
                    {r.value}
                  </a>
                ) : (
                  <span className="contact-value">{r.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="reveal orb-wrap" aria-hidden="true">
          <div className="orb">
            <div className="orb-ring" />
            <div className="orb-core" />
            <span className="orb-text">Open to meaningful work</span>
          </div>
        </div>
      </section>
    </main>
  );
}
