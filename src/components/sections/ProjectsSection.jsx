import { useState, memo, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  ChevronLeft,
  ChevronRight,
  Folder,
  Github,
  Layers,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useGSAP } from "@gsap/react";
import { projectsData } from "@/data";
import { useScrollLock } from "@/hooks";
import { gsap } from "@/lib/gsap";
import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectCard from "@/components/projects/ProjectCard";
import UnavailableModal from "@/components/projects/UnavailableModal";
import { ParallaxSection } from "@/components/ui";
import { Container, SectionHeader } from "@/components/ui";

const filterProjects = (projects, filter) => {
  if (filter === "All") return projects;
  return projects.filter((project) => project.category === filter);
};

const ProjectsSection = memo(() => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("All");
  const [showUnavailableModal, setShowUnavailableModal] = useState(false);
  const containerRef = useRef(null);

  useScrollLock(showUnavailableModal);

  // Derive categories
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(projectsData.map((project) => project.category)),
    ];
    return ["All", ...uniqueCategories];
  }, []);

  const filteredProjects = useMemo(
    () => filterProjects(projectsData, filter),
    [filter]
  );

  const handleUnavailableClick = () => setShowUnavailableModal(true);
  const handleCloseModal = () => setShowUnavailableModal(false);

  // Animations
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".projects-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
      tl.fromTo(
        ".projects-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

      gsap.fromTo(
        ".projects-filters",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-filters",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".projects-carousel",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-carousel",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
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
          <Layers size={75} key="layers" />,
        ]}
        orbColors={[
          "from-pink-500/10 to-rose-500/10",
          "from-purple-500/10 to-indigo-500/10",
        ]}
      >
        <Container ref={containerRef}>
          <SectionHeader
            title={t("projects.page_title")}
            subtitle={t("projects.page_subtitle")}
            className="projects-header"
            titleClassName="projects-title"
            subtitleClassName="projects-subtitle"
          />

          <div className="projects-filters">
            <ProjectFilters
              categories={categories}
              activeFilter={filter}
              onFilterChange={setFilter}
            />
          </div>

          <div className="projects-carousel relative max-w-7xl mx-auto">
            {/* Navigation */}
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
              className="pt-8! pb-16!"
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

          {/* No results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-(--color-text-secondary)">
                No projects found in this category.
              </p>
            </div>
          )}
        </Container>
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
