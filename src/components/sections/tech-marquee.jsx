import { techStack } from "../../data/tech-stack"; // Teknoloji logosu ve renkleri
import LogoLoop from "../ui/logo-loop";

// Teknoloji logosu şeridi.
function TechMarquee() {
  return (
    <section
      id="tech-marquee"
      className="relative overflow-hidden bg-white text-zinc-900"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-10">
        <LogoLoop items={techStack} />
      </div>
    </section>
  );
}

export default TechMarquee;
