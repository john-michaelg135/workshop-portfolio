import { certificates } from "@/lib/data";

export default function Certificates() {
  return (
    <section id="certificates" className="scene certs-scene">
      <header className="scene-heading">
        <span>NODE / 04</span>
        <h2>CERTS ACQUIRED</h2>
        <p>Verified credentials earned through training protocols. Each badge represents a completed knowledge path.</p>
      </header>

      <div className="certs-stats">
        <div className="cert-stat">
          <span className="cert-stat__value">{certificates.length}</span>
          <span className="cert-stat__label">CLEARED</span>
        </div>
        <div className="cert-stat">
          <span className="cert-stat__value">100%</span>
          <span className="cert-stat__label">PASS RATE</span>
        </div>
        <div className="cert-stat">
          <span className="cert-stat__value">★</span>
          <span className="cert-stat__label">VERIFIED</span>
        </div>
      </div>

      <div className="certs-grid">
        {certificates.map((cert, i) => (
          <article key={cert.id} className="cert-card">
            <div className="cert-badge">
              <span className="cert-badge__ring" />
              <span className="cert-badge__icon">{i === 0 ? "◆" : "◇"}</span>
              <span className="cert-badge__level">LV.{i + 1}</span>
            </div>
            <div className="cert-content">
              <p className="cert-issuer">{cert.issuer.toUpperCase()}</p>
              <h3 className="cert-title">{cert.title}</h3>
              <div className="cert-meta">
                <span>ISSUED: {cert.issuedDate}</span>
                <span>ID: {cert.credentialId.slice(0, 12)}…</span>
              </div>
              <div className="cert-skills">
                {cert.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
              <div className="cert-xp">
                <div className="cert-xp__bar"><span style={{ width: "100%" }} /></div>
                <span className="cert-xp__label">COMPLETE — 100 XP</span>
              </div>
            </div>
            <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="cert-verify">
              VERIFY ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
