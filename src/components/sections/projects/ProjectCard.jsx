import { memo } from "react";
import PropTypes from "prop-types";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "../../ui/Card";

const ProjectCard = memo(({ project, onUnavailableClick }) => {
  const { t } = useTranslation();

  return (
    <div className="h-full group">
      <Card
        variant="project"
        padding="none"
        className="h-full flex flex-col min-h-[450px]"
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-(--color-bg-tertiary) shadow-sm">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full transition-all duration-200 bg-(--color-accent) text-(--color-bg-primary) hover:scale-110 active:scale-95"
                title="Visit Website"
              >
                <ExternalLink size={20} />
              </a>
            ) : (
              <button
                onClick={onUnavailableClick}
                className="p-3 rounded-full transition-all duration-200 bg-(--color-accent) text-(--color-bg-primary) hover:scale-110 active:scale-95"
                title="Website Unavailable"
              >
                <ExternalLink size={20} />
              </button>
            )}
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full transition-all duration-200 bg-(--color-accent) text-(--color-bg-primary) hover:scale-110 active:scale-95"
              title="View Repository"
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl md:text-2xl font-bold mb-3 transition-colors text-(--color-text-primary)">
            {project.title}
          </h3>

          <p className="mb-4 leading-relaxed text-(--color-text-secondary) flex-1">
            {t(project.desc)}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-default bg-(--color-overlay) text-(--color-text-secondary) hover:bg-(--color-overlay-hover) hover:scale-105"
              >
                {tech}
              </span>
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
