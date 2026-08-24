import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects } from "../../data/projects"; // Proje bilgilerinin bulunduğu dizi
import AnimatedContent from "../ui/animated-content";
import Safari from "../ui/safari";
import SpecularButton from "../ui/specular-button";

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-zinc-200 bg-white text-zinc-900"
    >
      <div className="section-title-band">
        <div className="section-title-band-inner mx-auto w-full max-w-6xl px-6 lg:px-8">
          <h2 className="section-title">Projeler</h2>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pt-6 pb-5 lg:px-8 lg:pt-8 lg:pb-7">
        <p className="about-text max-w-2xl">Geliştirdiğim bazı projeler.</p>

        <div className="mt-10 flex flex-col gap-20">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.name}
              project={project}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Tek bir proje satırı
function ProjectRow({ project, reversed }) {
  const displayUrl = project.liveUrl.replace(/^https?:\/\//, "");

  return (
    <div
      className={`flex flex-col gap-8 md:items-center md:gap-14 ${
        reversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <AnimatedContent
        onScroll
        direction="horizontal"
        reverse={reversed}
        className="md:flex-1"
      >
        <Safari
          url={displayUrl}
          imageSrc={project.image}
          imageAlt={project.name}
        />
      </AnimatedContent>

      <AnimatedContent
        delay={100}
        onScroll
        direction="horizontal"
        reverse={!reversed}
        className="md:flex-1"
      >
        <h3 className="card-title">{project.name}</h3>
        <p className="about-text mt-3">{project.description}</p>

        <div className="project-tech mt-4">
          <p className="tech-label">Kullanılan Teknolojiler</p>
          <p className="tech-list">{project.tech.join(", ")}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {project.githubUrl && (
            <SpecularButton
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={14} />
              GitHub
            </SpecularButton>
          )}

          <SpecularButton
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={15} />
            Demo
          </SpecularButton>
        </div>
      </AnimatedContent>
    </div>
  );
}

export default ProjectsSection;
