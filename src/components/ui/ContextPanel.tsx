import { navLinks, socialLinks } from "@/lib/data";

const moduleColors: Record<string, string> = {
  "#home": "#00E5C8",
  "#projects": "#FF4F9A",
  "#skills": "#4FC3F7",
  "#certificates": "#D4A058",
  "#about": "#9C5FE0",
  "#contact": "#E53935",
};

export default function ContextPanel() {
  return (
    <aside className="context-panel" aria-label="Profile context">
      <section className="context-block">
        <div className="context-label"><span className="status-dot" />SIGNAL ONLINE</div>
        <p className="context-value">KAEL_GARCIA</p>
        <p className="context-copy">Data Services Specialist</p>
      </section>
      <section className="context-block">
        <div className="context-label">SYSTEM LOAD</div>
        <div className="metric-row"><span>FOCUS</span><b>73%</b></div>
        <div className="signal-meter"><span style={{ width: "73%" }} /></div>
        <div className="metric-row"><span>CREATIVITY</span><b>33%</b></div>
        <div className="signal-meter"><span style={{ width: "33%" }} /></div>
        <div className="metric-row"><span>CURIOSITY</span><b>89%</b></div>
        <div className="signal-meter"><span style={{ width: "89%" }} /></div>
      </section>
      <section className="context-block">
        <div className="context-label">ACTIVE MODULES</div>
        <div className="module-cloud">
          {navLinks.map((link) => (
            <span
              key={link.href}
              style={{ color: moduleColors[link.href], borderColor: moduleColors[link.href] }}
            >
              {link.label}
            </span>
          ))}
        </div>
      </section>
      <section className="context-block context-block--bottom">
        <div className="context-label">EXTERNAL NODES</div>
        {socialLinks.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{link.platform.toUpperCase()} ↗</a>)}
      </section>
    </aside>
  );
}
