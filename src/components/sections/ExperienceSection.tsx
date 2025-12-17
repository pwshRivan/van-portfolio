import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Briefcase, Calendar, Building2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/index";
import { experienceData } from "@/data/index";
import { ParallaxSection, Container, SectionHeader } from "@/components/ui";

const ExperienceSection = memo(() => {
  const { t } = useTranslation();

  // Flowing animation - header first, then timeline items
  const containerRef = useScrollAnimation(
    {
      ".exp-title": { y: 40, duration: 800 },
      ".exp-subtitle": { y: 30, delay: 100, duration: 800 },
      ".timeline-item": { y: 40, stagger: 150, startDelay: 250, duration: 800 },
    },
    { threshold: 0.1 }
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
          titleClassName="exp-title opacity-0"
          subtitleClassName="exp-subtitle opacity-0"
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-(--color-border) -translate-x-1/2">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-(--color-accent) via-(--color-accent) to-transparent origin-top" />
          </div>

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <div
                key={exp.id}
                className={`timeline-item relative flex flex-col md:flex-row gap-8 opacity-0 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-(--color-accent) bg-(--color-bg-primary) z-10">
                  <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-(--color-accent)" />
                </div>

                {/* Content Card */}
                <div className="ml-12 md:ml-0 md:w-1/2">
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
