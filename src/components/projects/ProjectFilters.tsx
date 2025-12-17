import { memo } from "react";

interface ProjectFiltersProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (category: string) => void;
}

const ProjectFilters = memo(
  ({ categories, activeFilter, onFilterChange }: ProjectFiltersProps) => {
    return (
      <div className="flex justify-center mb-12">
        <div className="flex p-1 rounded-full border border-(--color-border) bg-(--color-bg-secondary)">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onFilterChange(category)}
              aria-label={`Filter projects by ${category}`}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "text-(--color-bg-primary)"
                  : "text-(--color-text-secondary) hover:text-(--color-text-primary)"
              }`}
            >
              {activeFilter === category && (
                <div className="absolute inset-0 rounded-full bg-(--color-accent)" />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
);

ProjectFilters.displayName = "ProjectFilters";

export default ProjectFilters;
