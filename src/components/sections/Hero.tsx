"use client";

import Image from "next/image";
import { heroData } from "@/lib/data";
import { useState, useEffect, useCallback } from "react";

const TITLES = [
  "DATA SERVICES SPECIALIST",
  "ASPIRING DATA ANALYST",
  "ASPIRING PYTHON DEVELOPER",
  "DOST SCHOLAR",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentTitle = TITLES[titleIndex];

  const tick = useCallback(() => {
    if (!isDeleting) {
      // Typing
      setDisplayText((prev) => currentTitle.slice(0, prev.length + 1));
    } else {
      // Deleting
      setDisplayText((prev) => prev.slice(0, -1));
    }
  }, [isDeleting, currentTitle]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentTitle) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      // Move to next title
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    } else {
      // Continue typing or deleting
      const speed = isDeleting ? 40 : 80;
      timeout = setTimeout(tick, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTitle, tick]);

  return (
    <section id="home" className="scene hero-scene scene--teal">
      <div className="hero-code" aria-hidden="true">K<br />A<br />E<br />L</div>
      <div className="hero-copy enter-rise">
        <p className="scene-kicker"><span /> USER_001 / AVAILABLE</p>
        <h1>GARCIA.<br /><em className="hero-typewriter-title">{displayText}<span className="typewriter-cursor" aria-hidden="true">|</span></em></h1>
        <p className="hero-role">PROFILE.SYS: 2005.03</p>
        <p className="hero-summary">{heroData.subtext}</p>
        <div className="hero-actions"><a href="#projects">ENTER WORKSPACE <span>↘</span></a><a href="#contact">OPEN CHANNEL</a></div>
      </div>
      <div className="hero-visual enter-glitch">
        <div className="portrait-frame scanlines">
          <Image src="/assets/portrait.jpg" alt="Kael Garcia" fill priority className="portrait-image" sizes="(max-width: 768px) 86vw, 38vw" />
          <div className="portrait-index">SUBJECT<br /><b>KG—26</b></div>
        </div>
        <div className="visual-tag visual-tag--pink"><span>CREATIVE</span><b>PHOTO / 35MM</b></div>
        <div className="visual-tag visual-tag--blue"><span>LOGIC</span><b>DATA / WEB</b></div>
      </div>
      <div className="hero-telemetry" aria-label="Current profile metrics">
        <div><span>STATUS</span><b>OPEN TO WORK</b></div><div><span>LOCATION</span><b>PHILIPPINES</b></div><div><span>SIGNAL</span><b>98.7%</b></div>
      </div>
    </section>
  );
}
