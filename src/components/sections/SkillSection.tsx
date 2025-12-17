import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Cpu, Database, Layout } from "lucide-react";
import { useTheme, useScrollAnimation } from "@/hooks/index";
import { skillData } from "@/data/index";
import { ParallaxSection, Container, SectionHeader } from "@/components/ui";

const SkillSection = memo(() => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const allSkills = [
    ...skillData.frontend.skills,
    ...skillData.backend.skills,
    ...skillData.tools.skills,
  ];

  const needsInversion = (skillName: string) => {
    const darkLogos = ["Next.js"];
    return darkLogos.includes(skillName) && isDark;
  };

  // Flowing animation - title first, then skills flow in
  const containerRef = useScrollAnimation(
    {
      ".skill-title": { y: 40, duration: 800 },
      ".skill-subtitle": { y: 30, delay: 100, duration: 800 },
      ".skill-item": { y: 25, stagger: 50, startDelay: 250, duration: 600 },
    },
    { threshold: 0.15 }
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
          titleClassName="skill-title opacity-0"
          subtitleClassName="skill-subtitle opacity-0"
        />

        {/* Skill grid */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {allSkills.map((skill) => (
              <div key={skill.name} className="skill-item group opacity-0">
                <div className="relative flex flex-col items-center gap-2 p-4 w-24 rounded-2xl bg-(--color-surface) border border-(--color-border) hover:border-(--color-accent) transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default">
                  <div className="absolute inset-0 rounded-2xl bg-(--color-accent)/0 group-hover:bg-(--color-accent)/5 transition-colors duration-300" />

                  <div
                    className="relative z-10 w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      filter: needsInversion(skill.name) ? "invert(1)" : "none",
                    }}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-9 h-9 object-contain drop-shadow-sm"
                    />
                  </div>

                  <span className="relative z-10 text-[11px] font-medium text-center leading-tight text-(--color-text-secondary) group-hover:text-(--color-text-primary) transition-colors duration-300">
                    {skill.name}
                  </span>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-(--color-accent) rounded-full group-hover:w-12 transition-all duration-300" />
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
