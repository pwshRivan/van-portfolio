import { memo } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, Button, LazyImage } from "@/components/ui";

interface Project {
  id: number;
  title: string;
  desc: string;
  tech: string[];
  image: string;
  link?: string | null;
  repo: string;
}

interface ProjectActionsProps {
  project: Pick<Project, "title" | "link" | "repo">;
  onUnavailableClick: () => void;
}

const ProjectActionsDesktop = ({
  project,
  onUnavailableClick,
}: ProjectActionsProps) => (
  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-200 hidden lg:flex items-center justify-center gap-4">
    {project.link ? (
      <Button
        asChild
        size="icon"
        className="rounded-full transition-all duration-200 bg-(--color-accent) text-(--color-bg-primary) hover:opacity-90 border-none scale-0 group-hover:scale-100 delay-75"
        title="Visit Website"
        aria-label={`Visit ${project.title} website`}
      >
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={20} />
        </a>
      </Button>
    ) : (
      <Button
        size="icon"
        onClick={onUnavailableClick}
        className="rounded-full transition-all duration-200 bg-(--color-accent) text-(--color-bg-primary) hover:opacity-90 border-none scale-0 group-hover:scale-100 delay-75"
        title="Website Unavailable"
        aria-label="Website Unavailable"
      >
        <ExternalLink size={20} />
      </Button>
    )}
    <Button
      asChild
      size="icon"
      className="rounded-full transition-all duration-200 bg-(--color-accent) text-(--color-bg-primary) hover:opacity-90 border-none scale-0 group-hover:scale-100 delay-100"
      title="View Repository"
      aria-label={`View ${project.title} repository`}
    >
      <a href={project.repo} target="_blank" rel="noopener noreferrer">
        <Github size={20} />
      </a>
    </Button>
  </div>
);

const ProjectActionsMobile = ({
  project,
  onUnavailableClick,
}: ProjectActionsProps) => (
  <div className="flex lg:hidden items-center gap-3 mt-6 pt-5 border-t border-(--color-border)">
    {project.link ? (
      <Button
        asChild
        className="flex-1 transition-all duration-200 bg-(--color-text-primary) text-(--color-bg-primary) hover:opacity-90 rounded-full text-sm font-semibold h-10"
      >
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
          aria-label={`Visit ${project.title} website`}
        >
          <ExternalLink size={16} />
          <span>Visit</span>
        </a>
      </Button>
    ) : (
      <Button
        onClick={onUnavailableClick}
        className="flex-1 transition-all duration-200 bg-(--color-surface) text-(--color-text-secondary) hover:bg-(--color-surface-hover) rounded-full text-sm font-semibold border border-(--color-border) h-10"
        aria-label="Website Unavailable"
      >
        <div className="flex items-center justify-center gap-2">
          <ExternalLink size={16} />
          <span>Visit</span>
        </div>
      </Button>
    )}
    <Button
      asChild
      className="flex-1 transition-all duration-200 bg-(--color-surface) text-(--color-text-primary) hover:bg-(--color-surface-hover) rounded-full text-sm font-semibold border border-(--color-border) h-10"
    >
      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2"
        aria-label={`View ${project.title} repository`}
      >
        <Github size={16} />
        <span>Repo</span>
      </a>
    </Button>
  </div>
);

interface ProjectCardProps {
  project: Project;
  onUnavailableClick: () => void;
}

// main components
const ProjectCard = memo(
  ({ project, onUnavailableClick }: ProjectCardProps) => {
    const { t } = useTranslation();

    return (
      <div className="h-full group">
        <Card
          variant="project"
          padding="none"
          className="h-full flex flex-col min-h-[450px]"
        >
          {/* Image & Desktop Overlay */}
          <div className="relative h-56 overflow-hidden bg-(--color-bg-tertiary) shadow-sm rounded-t-[14px]">
            <LazyImage
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <ProjectActionsDesktop
              project={project}
              onUnavailableClick={onUnavailableClick}
            />
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold mb-3 transition-colors text-(--color-text-primary)">
              {project.title}
            </h3>

            <p className="mb-4 leading-relaxed text-(--color-text-secondary) flex-1 line-clamp-4">
              {t(project.desc)}
            </p>

            {/* Technology Stack */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-default bg-(--color-overlay) text-(--color-text-secondary) hover:bg-(--color-overlay-hover)"
                >
                  {tech}
                </span>
              ))}
            </div>

            <ProjectActionsMobile
              project={project}
              onUnavailableClick={onUnavailableClick}
            />
          </div>
        </Card>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
