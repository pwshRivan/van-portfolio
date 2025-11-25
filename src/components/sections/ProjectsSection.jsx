import { useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { motion as Motion } from "motion/react";
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Folder,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { PROJECTS_DATA } from "@/data/portfolioData";
import { Card } from "../ui/Card";

const ProjectsSection = memo(() => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("All");

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const categories = ["All", "Frontend", "Backend", "Fullstack"];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (filter === "All") return true;
    const techString = project.tech.join(" ").toLowerCase();
    if (filter === "Frontend")
      return techString.includes("react") || techString.includes("tailwind");
    if (filter === "Backend")
      return (
        techString.includes("node") ||
        techString.includes("php") ||
        techString.includes("laravel")
      );
    return true;
  });

  return (
    <section
      id="projects"
      className="py-16 md:py-24 min-h-screen relative overflow-hidden bg-(--color-bg-primary)"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Icons */}
        <Motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-32 left-1/4 opacity-5"
        >
          <Folder size={85} style={{ color: "var(--color-accent)" }} />
        </Motion.div>
        <Motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
          className="absolute bottom-40 right-1/3 opacity-5"
        >
          <Github size={80} style={{ color: "var(--color-accent)" }} />
        </Motion.div>

        {/* Gradient Orbs */}
        <Motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 40, 0],
            scale: [1, 1.18, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 w-[400px] h-[400px] bg-linear-to-br from-indigo-500/15 to-purple-500/15 rounded-full blur-3xl"
        />
        <Motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -35, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 left-10 w-[420px] h-[420px] bg-linear-to-tr from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl"
        />

        {/* Accent Lines */}
        <div className="absolute top-1/4 left-20 w-40 h-0.5 bg-linear-to-r from-transparent via-(--color-accent) to-transparent opacity-30" />
        <div className="absolute bottom-1/4 right-20 w-36 h-0.5 bg-linear-to-r from-transparent via-(--color-accent) to-transparent opacity-30" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={filterVariants}
          className="flex justify-center mb-12"
        >
          <div className="flex p-1 rounded-full border border-(--color-border) bg-(--color-bg-secondary)">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                aria-label={`Filter projects by ${category}`}
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? "text-(--color-bg-primary)"
                    : "text-(--color-text-secondary) hover:text-(--color-text-primary)"
                }`}
              >
                {filter === category && (
                  <div className="absolute inset-0 rounded-full bg-(--color-accent)" />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
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
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12!"
          >
            {filteredProjects.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="h-full group">
                  <Card
                    variant="project"
                    padding="none"
                    className="h-full flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden bg-(--color-bg-tertiary)">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full transition-all duration-200 bg-(--color-accent) text-(--color-bg-primary) hover:scale-110 active:scale-95"
                          title="Visit Website"
                        >
                          <ExternalLink size={20} />
                        </a>
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
  );
});

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
