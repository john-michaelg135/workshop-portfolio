import { experiences } from "@/lib/data";

export default function Experience() {
  return (
    <section className="px-6 md:px-12 lg:px-[108px] py-20 border-t border-border">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column: heading */}
        <div className="flex-1">
          <h2 className="font-display text-[48px] md:text-[60px] lg:text-[76px] leading-[1] gradient-text">
            EXPERIENCE
          </h2>
        </div>

        {/* Right column: experience list */}
        <div className="flex-1 flex flex-col gap-8">
          {experiences.map((exp) => (
            <article
              key={exp.id}
              className="flex flex-col gap-3 border-t border-border pt-8 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="font-body font-medium text-2xl leading-[1.3] tracking-[-0.24px] text-text-primary">
                  {exp.jobTitle}
                </h3>
                <span className="font-body text-base text-text-secondary">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>
              <p className="font-body font-semibold text-base leading-[1.5] uppercase text-accent">
                {exp.company}
              </p>
              <p className="font-body text-lg leading-[1.5] text-text-secondary">
                {exp.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
