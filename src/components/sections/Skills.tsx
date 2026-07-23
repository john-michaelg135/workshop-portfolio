import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="scene skills-scene scene--blue">
      <header className="scene-heading">
        <span>NODE / 03</span><h2>SKILL MATRIX</h2><p>Active modules loaded into the system core.</p>
      </header>
      <div className="skill-grid">
        {skills.map((skill, i) => (
          <div key={skill} className="skill-node" style={{ "--i": i } as React.CSSProperties}>
            <span className="skill-index">{String(i + 1).padStart(2, "0")}</span>
            <span className="skill-name">{skill}</span>
            <span className="skill-bar"><span /></span>
          </div>
        ))}
      </div>
    </section>
  );
}
