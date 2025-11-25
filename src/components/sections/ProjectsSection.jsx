import { useState, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion as Motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { PROJECTS_DATA } from "@/data/portfolioData";
import { useScrollLock } from "@/hooks/useScrollLock";
import ProjectFilters from "./projects/ProjectFilters";
import ProjectCard from "./projects/ProjectCard";
import UnavailableModal from "./projects/UnavailableModal";
import ProjectsBackground from "./projects/ProjectsBackground";

const CATEGORIES = ["All", "Frontend", "Backend", "Fullstack"];

const filterProjects = (projects, filter) => {
  if (filter === "All") return projects;

  return projects.filter((project) => {
    const techString = project.tech.join(" ").toLowerCase();

    if (filter === "Frontend") {
      return techString.includes("react") || techString.includes("tailwind");
    }

    if (filter === "Backend") {
      return (
        techString.includes("node") ||
        techString.includes("php") ||
        techString.includes("laravel")
      );
    }

    return true;
  });
};

const ProjectsSection = memo(() => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("All");
  const [showUnavailableModal, setShowUnavailableModal] = useState(false);

  useScrollLock(showUnavailableModal);

  const filteredProjects = useMemo(
    () => filterProjects(PROJECTS_DATA, filter),
    [filter]
  );

  const handleUnavailableClick = () => setShowUnavailableModal(true);
  const handleCloseModal = () => setShowUnavailableModal(false);

  return (
    <>
      <section
        id="projects"
        className="py-16 md:py-24 min-h-screen relative overflow-hidden bg-(--color-bg-primary)"
      >
        <ProjectsBackground />

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-medium bg-(--color-surface) border border-(--color-border) text-(--color-text-secondary) mb-6">
              <span className="inline-flex rounded-full h-2.5 w-2.5 bg-(--color-accent)" />
              Portfolio
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-(--color-text-primary)">
              {t("projects.page_title")}
            </h1>

            <p className="text-lg md:text-xl text-(--color-text-secondary)">
              {t("projects.page_subtitle")}
            </p>
          </Motion.div>

          {/* Filter Tabs */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ProjectFilters
              categories={CATEGORIES}
              activeFilter={filter}
              onFilterChange={setFilter}
            />
          </Motion.div>

          {/* Swiper Carousel */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative max-w-7xl mx-auto"
          >
            {/* Navigation Buttons */}
            <button
              aria-label="Previous project"
              className="swiper-button-prev-custom absolute -left-16 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-(--color-accent) text-(--color-bg-primary) hover:scale-110 transition-all disabled:opacity-50"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              aria-label="Next project"
              className="swiper-button-next-custom absolute -right-16 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-(--color-accent) text-(--color-bg-primary) hover:scale-110 transition-all disabled:opacity-50"
            >
              <ChevronRight size={24} />
            </button>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={32}
              slidesPerView={1}
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-12!"
            >
              {filteredProjects.map((project) => (
                <SwiperSlide key={project.id} className="h-auto">
                  <ProjectCard
                    project={project}
                    onUnavailableClick={handleUnavailableClick}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-(--color-text-secondary)">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <UnavailableModal
        isOpen={showUnavailableModal}
        onClose={handleCloseModal}
      />
    </>
  );
});

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
