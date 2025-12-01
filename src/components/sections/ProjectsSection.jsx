import { useState, memo, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Folder, Github, Layers } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { projectsData } from "@/data";
import { useScrollLock } from "@/hooks/useScrollLock";
import ProjectFilters from "./projects/ProjectFilters";
import ProjectCard from "./projects/ProjectCard";
import UnavailableModal from "./projects/UnavailableModal";
import { ParallaxSection } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef(null);

  useScrollLock(showUnavailableModal);

  const filteredProjects = useMemo(
    () => filterProjects(projectsData, filter),
    [filter]
  );

  const handleUnavailableClick = () => setShowUnavailableModal(true);
  const handleCloseModal = () => setShowUnavailableModal(false);

  useGSAP(
    () => {
      // Animasi Header
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 80%",
        },
        defaults: { ease: "power4.out", duration: 1.2 }
      });

      tl.fromTo(
        ".projects-badge",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );

      tl.fromTo(
        ".projects-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.6"
      );

      tl.fromTo(
        ".projects-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.8"
      );

      // Animasi Filter
      gsap.fromTo(
        ".projects-filters",
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".projects-filters",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Animasi Carousel
      gsap.fromTo(
        ".projects-carousel",
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".projects-carousel",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <>
      <ParallaxSection
        id="projects"
        className="py-20 md:py-32 min-h-screen bg-(--color-bg-primary)"
        floatingIcons={[
          <Folder size={80} key="folder" />,
          <Github size={70} key="github" />,
          <Layers size={75} key="layers" />
        ]}
        orbColors={["from-pink-500/10 to-rose-500/10", "from-purple-500/10 to-indigo-500/10"]}
      >
        <div ref={containerRef} className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="projects-header max-w-3xl mx-auto text-center mb-16 space-y-6">
            <div className="projects-badge inline-flex items-center gap-3 px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase bg-(--color-surface) border border-(--color-border) text-(--color-text-secondary) backdrop-blur-sm">
              <span className="inline-flex rounded-full h-2 w-2 bg-(--color-accent)" />
              Portfolio
            </div>

            <h1 className="projects-title text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-(--color-text-primary)">
              {t("projects.page_title")}
            </h1>

            <p className="projects-subtitle text-lg md:text-xl text-(--color-text-secondary) font-light">
              {t("projects.page_subtitle")}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="projects-filters">
            <ProjectFilters
              categories={CATEGORIES}
              activeFilter={filter}
              onFilterChange={setFilter}
            />
          </div>

          {/* Swiper Carousel */}
          <div className="projects-carousel relative max-w-7xl mx-auto">
            {/* Navigation Buttons */}
            <button
              aria-label="Previous project"
              className="swiper-button-prev-custom absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-(--color-bg-secondary) border border-(--color-border) text-(--color-text-primary) hover:bg-(--color-accent) hover:text-(--color-bg-primary) transition-all disabled:opacity-50 shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              aria-label="Next project"
              className="swiper-button-next-custom absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-(--color-bg-secondary) border border-(--color-border) text-(--color-text-primary) hover:bg-(--color-accent) hover:text-(--color-bg-primary) transition-all disabled:opacity-50 shadow-lg"
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
              className="!pt-8 !pb-16"
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
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-(--color-text-secondary)">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </ParallaxSection>

      <UnavailableModal
        isOpen={showUnavailableModal}
        onClose={handleCloseModal}
      />
    </>
  );
});

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
