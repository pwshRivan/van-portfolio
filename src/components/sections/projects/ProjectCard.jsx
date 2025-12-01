import { memo } from "react";
import PropTypes from "prop-types";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, Badge, Button, LazyImage } from "@/components/ui";

const ProjectCard = memo(({ project, onUnavailableClick }) => {
  const { t } = useTranslation();

  return (
    <div className="h-full group">
      <Card
        variant="project"
        padding="none"
        className="h-full flex flex-col min-h-[450px]"
      >
        {/* Gambar */}
        <div className="relative h-56 overflow-hidden bg-(--color-bg-tertiary) shadow-sm rounded-t-[14px]">
          <LazyImage
            src={project.image}
            alt={project.title}
            className="w-full h-full"
          />

          {/* Overlay saat Hover */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
            {project.link ? (
              <Button
                asChild
                size="icon"
                className="rounded-full transition-all duration-200 bg-(--color-accent) text-(--color-bg-primary) hover:opacity-90 border-none"
                title="Visit Website"
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={20} />
                </a>
              </Button>
            ) : (
              <Button
                size="icon"
                onClick={onUnavailableClick}
                className="rounded-full transition-all duration-200 bg-(--color-accent) text-(--color-bg-primary) hover:opacity-90 border-none"
                title="Website Unavailable"
              >
                <ExternalLink size={20} />
              </Button>
            )}
            <Button
              asChild
              size="icon"
              className="rounded-full transition-all duration-200 bg-(--color-accent) text-(--color-bg-primary) hover:opacity-90 border-none"
              title="View Repository"
            >
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
            </Button>
          </div>
        </div>

        {/* Konten */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl md:text-2xl font-bold mb-3 transition-colors text-(--color-text-primary)">
            {project.title}
          </h3>

          <p className="mb-4 leading-relaxed text-(--color-text-secondary) flex-1">
            {t(project.desc)}
          </p>

          {/* Stack Teknologi */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-default bg-(--color-overlay) text-(--color-text-secondary) hover:bg-(--color-overlay-hover) border-none"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string,
    repo: PropTypes.string.isRequired,
  }).isRequired,
  onUnavailableClick: PropTypes.func.isRequired,
};

export default ProjectCard;
