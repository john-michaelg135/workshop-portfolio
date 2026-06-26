import SkillChip from "@/components/ui/SkillChip";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section className="px-6 md:px-12 lg:px-[108px] py-20 border-t border-border">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column: heading */}
        <div className="flex-1">
          <h2 className="font-display text-[48px] md:text-[60px] lg:text-[76px] leading-[1] gradient-text">
            MY SKILLS
          </h2>
        </div>

        {/* Right column: skill chips */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-4">
            {skills.map((skill) => (
              <SkillChip key={skill} label={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
