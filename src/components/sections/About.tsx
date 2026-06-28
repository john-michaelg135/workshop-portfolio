import { aboutData } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About() {
  return (
    <section
      id="about"
      className="px-6 md:px-12 lg:px-[108px] py-20 border-t border-border"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column: heading */}
        <div className="flex-1">
          <ScrollReveal variant="left">
            <h2 className="font-display text-[48px] md:text-[60px] lg:text-[76px] leading-[1] gradient-text">
              ABOUT ME
            </h2>
          </ScrollReveal>
        </div>

        {/* Right column: content */}
        <ScrollReveal variant="right" className="flex-1 flex flex-col gap-6">
          <p className="font-body text-lg leading-[1.5] text-text-secondary">
            {aboutData.description}
          </p>
          <p className="font-body text-lg leading-[1.5] text-text-secondary">
            {aboutData.additionalInfo}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
