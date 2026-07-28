import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Certificates from "@/components/sections/Certificates";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import ContextPanel from "@/components/ui/ContextPanel";
import Particles from "@/components/ui/Particles";

export default function Home() {
  return (
    <div className="app-frame">
      <Navbar />
      <Particles />
      <main id="main-content" className="content-feed">
        <Hero />
        <Skills />
        <Projects />
        <Certificates />
        <About />
        <Contact />
      </main>
      <ContextPanel />
    </div>
  );
}
