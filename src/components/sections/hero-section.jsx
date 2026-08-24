import { dockItems } from "../../data/dock-items"; // CV, GitHub, LinkedIn ve e-posta bilgileri
import Navbar from "../layout/navbar";
import AnimatedContent from "../ui/animated-content";
import FloatingDock from "../ui/floating-dock";
import HackerBackground from "../ui/hacker-background";
import Terminal from "../ui/terminal";

// Arka plan, navbar, terminal ve aksiyon dock'u.
function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-155 overflow-hidden bg-black text-white">
      <HackerBackground
        color="#22d3ee"
        speed={0.3}
        className="opacity-[0.15]"
      />
      <div className="hero-overlay absolute inset-0" />

      <Navbar />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center justify-center px-6 pt-24 pb-20">
        <AnimatedContent delay={160} className="w-full">
          <Terminal />
        </AnimatedContent>

        <AnimatedContent delay={420} className="mt-8">
          <FloatingDock items={dockItems} />
        </AnimatedContent>
      </div>

      <a href="#tech-marquee" className="scroll-indicator">
        <span>Kaydır</span>
        <span className="h-8 w-px bg-cyan-300/70" />
      </a>
    </section>
  );
}

export default HeroSection;
