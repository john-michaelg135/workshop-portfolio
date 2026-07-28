import { technicalSkills, generalSkills } from "@/lib/data";

const LEVEL_LABELS = ["", "Beginner", "Intermediate", "Proficient"] as const;

export default function Skills() {
  return (
    <section id="skills" className="scene skills-scene scene--blue">
      <header className="scene-heading">
        <span>NODE / 02</span><h2>SKILL MATRIX</h2><p>Active user skills loaded into the system core.</p>
      </header>

      <div className="skills-layout">
        <div className="skills-technical">
          {technicalSkills.map((category) => (
            <div key={category.tag} className="skill-category">
              <div className="skill-category-header">
                <span className="skill-category-tag">{category.tag}</span>
                <span className="skill-category-label">{category.label}</span>
              </div>
              <div className="skill-category-list">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-pill-row">
                    <span className="skill-pill-name">{skill.name}</span>
                    <div className="skill-pill-bar" aria-label={`${skill.name}: ${LEVEL_LABELS[skill.level]}`}>
                      <span className={`skill-segment ${skill.level >= 1 ? "filled" : ""}`} />
                      <span className={`skill-segment ${skill.level >= 2 ? "filled" : ""}`} />
                      <span className={`skill-segment ${skill.level >= 3 ? "filled" : ""}`} />
                    </div>
                    <span className="skill-pill-level">{LEVEL_LABELS[skill.level]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-general">
          <div className="general-pills">
            {generalSkills.map((skill) => (
              <span key={skill} className="general-pill"><span className="general-pill-dot" />{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
