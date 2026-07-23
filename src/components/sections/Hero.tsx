import Image from "next/image";
import { heroData } from "@/lib/data";

export default function Hero() {
  return (
    <section id="home" className="scene hero-scene scene--teal">
      <div className="hero-code" aria-hidden="true">K<br />A<br />E<br />L</div>
      <div className="hero-copy enter-rise">
        <p className="scene-kicker"><span /> USER_001 / AVAILABLE</p>
        <h1>Kael.<br /><em>LV. 21.</em></h1>
        <p className="hero-role">DATA SERVICES SPWCIALIST <b>×</b> ASPIRING DATA ANALYST <b>×</b> DOST SCHOLAR</p>
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
