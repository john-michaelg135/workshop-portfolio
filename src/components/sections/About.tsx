import { aboutData, experiences } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="scene about-scene scene--violet">
      <header className="scene-heading">
        <span>NODE / 05</span><h2>MEMORY ARCHIVE</h2><p>Recovered fragments from user memory banks.</p>
      </header>
      <div className="archive-blocks">
        <article className="archive-card">
          <div className="archive-header"><span /> PROFILE.SYS</div>
          <p>{aboutData.description}</p>
          <p>{aboutData.additionalInfo}</p>
          <footer>LAST_SYNC: 2026.07 &bull; ACCESS: PUBLIC</footer>
        </article>
        <article className="archive-card archive-card--timeline">
          <div className="archive-header"><span /> TIMELINE.LOG</div>
          <div className="timeline">
            {experiences.map((exp) => (
              <div key={exp.id} className="timeline-entry">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-meta">{exp.startDate}–{exp.endDate}</div>
                  <h4>{exp.jobTitle}</h4>
                  <p className="timeline-company">{exp.company}</p>
                  <p>{exp.description}</p>
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="timeline-skills">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="timeline-skill-tag">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
