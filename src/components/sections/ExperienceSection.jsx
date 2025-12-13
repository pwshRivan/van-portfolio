import { memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGSAP } from "@gsap/react";
import { Briefcase, Calendar, Building2 } from "lucide-react";
import { experienceData } from "@/data";
import { ParallaxSection, Container, SectionHeader } from "@/components/ui";
import { gsap } from "@/lib/gsap";

const ExperienceSection = memo(() => {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  // Consolidated GSAP animations
  useGSAP(
    () => {
      // Header Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".exp-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".exp-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
      tl.fromTo(
        ".exp-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

      // Timeline Items Animation
      const items = gsap.utils.toArray(".timeline-item");
      items.forEach((item) => {
        const content = item.querySelector(".timeline-content");
        const node = item.querySelector(".timeline-node");

        const itemTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Animate node
        if (node) {
          itemTl.fromTo(
            node,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
          );
        }

        // Animate content
        if (content) {
          itemTl.fromTo(
            content,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.4"
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <ParallaxSection
      id="experience"
      className="py-20 md:py-32 bg-(--color-bg-primary)"
      floatingIcons={[
        <Briefcase size={80} key="briefcase" />,
        <Calendar size={70} key="calendar" />,
        <Building2 size={75} key="building" />,
      ]}
      orbColors={[
        "from-indigo-500/10 to-blue-500/10",
        "from-cyan-500/10 to-teal-500/10",
      ]}
    >
      <Container ref={containerRef}>
        <SectionHeader
          title={t("experience.title")}
          subtitle={t("experience.subtitle")}
          className="exp-header"
          titleClassName="exp-title"
          subtitleClassName="exp-subtitle"
        />

        {/* Timeline */}
        <div className="timeline-container relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-(--color-border) -translate-x-1/2">
            <div className="timeline-line absolute top-0 left-0 w-full h-full bg-linear-to-b from-(--color-accent) via-(--color-accent) to-transparent origin-top" />
          </div>

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <div
                key={exp.id}
                className={`timeline-item relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-(--color-accent) bg-(--color-bg-primary) z-10 timeline-node">
                  <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-(--color-accent)" />
                </div>

                {/* Content Card */}
                <div className="ml-12 md:ml-0 md:w-1/2 timeline-content">
                  <div
                    className={`p-6 rounded-2xl bg-(--color-surface) border-2 border-(--color-border) shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-(--color-accent) transition-all duration-300 group ${
                      index % 2 === 0 ? "md:text-left" : "md:text-right"
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-medium mb-4 rounded-full border bg-(--color-surface) border-(--color-border) text-(--color-text-secondary) ${
                        index % 2 === 0
                          ? "mr-auto"
                          : "ml-auto md:ml-auto md:mr-0"
                      }`}
                    >
                      <Calendar size={12} />
                      <span>{exp.period}</span>
                    </div>

                    <h3 className="text-xl font-medium text-(--color-text-primary) mb-1 group-hover:text-(--color-accent) transition-colors">
                      {t(exp.role)}
                    </h3>

                    <div
                      className={`flex items-center gap-2 text-(--color-text-secondary) mb-4 ${
                        index % 2 === 0
                          ? "justify-start"
                          : "justify-start md:justify-end"
                      }`}
                    >
                      <Briefcase size={16} />
                      <span className="font-medium">{t(exp.company)}</span>
                    </div>

                    <p className="text-sm leading-relaxed text-(--color-text-secondary) font-light">
                      {t(exp.desc)}
                    </p>
                  </div>
                </div>

                {/* Empty Space for Grid alignment */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </ParallaxSection>
  );
});

ExperienceSection.displayName = "ExperienceSection";

export default ExperienceSection;
