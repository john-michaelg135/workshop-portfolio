import Image from "next/image";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { heroData } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="home"
      className="px-6 md:px-12 lg:px-[108px] pt-24 pb-20 min-h-screen flex items-center"
    >
      <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-6">
        {/* Left column: content */}
        <ScrollReveal variant="left" className="flex-1 flex flex-col gap-8">
          <h1 className="font-display text-[56px] md:text-[76px] lg:text-[101px] leading-[0.9] gradient-text">
            {heroData.heading}
          </h1>
          <p className="font-body text-lg leading-[1.5] text-text-secondary max-w-[540px]">
            {heroData.subtext}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" href="#projects">
              {heroData.ctaPrimary}
            </Button>
            <Button variant="primary" href="#contact">
              {heroData.ctaSecondary}
            </Button>
          </div>
        </ScrollReveal>

        {/* Right column: profile image */}
        <ScrollReveal variant="right" delay={120} className="flex-1 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[280px] lg:max-w-[340px] aspect-[6/7] rounded-lg overflow-hidden">
            <Image
              src="/assets/portrait.jpg"
              alt="Kael — Fullstack Developer portrait"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
