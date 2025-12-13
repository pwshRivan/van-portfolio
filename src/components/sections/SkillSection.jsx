import { memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGSAP } from "@gsap/react";
import { Cpu, Database, Layout } from "lucide-react";
import { useTheme } from "@/hooks";
import { skillData } from "@/data";
import {
  ParallaxSection,
  TechIcon,
  Container,
  SectionHeader,
} from "@/components/ui";
import { gsap } from "@/lib/gsap";

const SkillSection = memo(() => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const containerRef = useRef(null);

  // Combine all skills from all categories
  const allSkills = [
    ...skillData.frontend.skills,
    ...skillData.backend.skills,
    ...skillData.tools.skills,
  ];

  // Check if logo needs inversion in dark mode
  const needsInversion = (skillName) => {
    const darkLogos = ["Next.js"];
    return darkLogos.includes(skillName) && isDark;
  };

  // Consolidated GSAP animations
  useGSAP(
    () => {
      // Header Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".skill-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".skill-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
      tl.fromTo(
        ".skill-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

      // Grid items animation
      gsap.fromTo(
        ".skill-item",
        { y: 30, scale: 0.9, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skill-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <ParallaxSection
      id="skills"
      className="py-20 md:py-32 bg-(--color-bg-primary)"
      floatingIcons={[
        <Cpu size={80} key="cpu" />,
        <Database size={70} key="db" />,
        <Layout size={75} key="layout" />,
      ]}
      orbColors={[
        "from-orange-500/10 to-red-500/10",
        "from-yellow-500/10 to-amber-500/10",
      ]}
    >
      <Container ref={containerRef}>
        <SectionHeader
          title="Tech Stack"
          subtitle={t("skills.subtitle")}
          className="skill-header"
          titleClassName="skill-title"
          subtitleClassName="skill-subtitle"
        />

        {/* Skills Grid */}
        <div className="skill-grid max-w-5xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
            {allSkills.map((skill) => (
              <div key={skill.name} className="skill-item group">
                <div className="flex flex-col items-center gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-(--color-accent) bg-(--color-surface) border-2 border-(--color-border) shadow-sm hover:shadow-md relative overflow-hidden">
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-(--color-surface) to-transparent pointer-events-none" />

                  {/* Icon */}
                  <div
                    className="relative z-10 w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      filter: needsInversion(skill.name) ? "invert(1)" : "none",
                    }}
                  >
                    <TechIcon
                      src={skill.icon}
                      alt={skill.name}
                      className={skill.className || "w-10 h-10"}
                    />
                  </div>

                  {/* Name */}
                  <span className="text-xs font-medium text-center leading-tight relative z-10 text-(--color-text-secondary) group-hover:text-(--color-text-primary) transition-colors duration-300">
                    {skill.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </ParallaxSection>
  );
});

SkillSection.displayName = "SkillSection";

export default SkillSection;
