import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { skillCategories } from "../../data/skill-categories";
import AnimatedContent from "../ui/animated-content";
import CanvasRevealEffect from "../ui/canvas-reveal-effect";

function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t border-zinc-200 bg-white text-zinc-900"
    >
      <div className="section-title-band">
        <div className="section-title-band-inner mx-auto w-full max-w-6xl px-6 lg:px-8">
          <h2 className="section-title">Yetenekler</h2>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pt-6 pb-5 lg:px-8 lg:pt-8 lg:pb-7">
        <p className="about-text max-w-2xl">
          Projelerimi geliştirirken en sık kullandığım teknolojiler ve araçlar.
        </p>

        <div className="skill-categories mt-10">
          {skillCategories.map((category, index) => (
            <AnimatedContent
              key={category.title}
              onScroll
              direction="horizontal"
              reverse={index % 2 === 1}
              delay={Math.floor(index / 2) * 90}
            >
              <SkillCard category={category} />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}

// Tek bir yetenek kartı
function SkillCard({ category }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`skill-category ${hovered ? "is-hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="skill-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <CanvasRevealEffect
              animationSpeed={category.animationSpeed}
              containerClassName={category.containerClassName}
              colors={category.colors}
              dotSize={category.dotSize}
              opacities={[
                0.3, 0.3, 0.3, 0.45, 0.45, 0.45, 0.65, 0.65, 0.65, 0.85,
              ]}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="skill-content">
        <h3 className="card-title">{category.title}</h3>
        <p className="card-subtext">{category.items.join(", ")}</p>
      </div>
    </div>
  );
}

export default SkillsSection;
