import Footer from "./components/layout/footer";
import AboutSection from "./components/sections/about-section";
import ContactSection from "./components/sections/contact-section";
import HeroSection from "./components/sections/hero-section";
import ProjectsSection from "./components/sections/projects-section";
import SkillsSection from "./components/sections/skills-section";
import TechMarquee from "./components/sections/tech-marquee";

function App() {
  return (
    <main className="bg-white">
      <HeroSection />
      <TechMarquee />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

export default App;
