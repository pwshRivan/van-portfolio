import { memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Database, Layout } from "lucide-react";
import { useTheme } from "@/hooks";
import { skillCategories } from "@/data";
import { ParallaxSection, Badge } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const SkillSection = memo(() => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const containerRef = useRef(null);

  // Gabungkan semua skill dari semua kategori
  const allSkills = [
    ...skillCategories.frontend.skills,
    ...skillCategories.backend.skills,
    ...skillCategories.tools.skills,
  ];

  // Fungsi untuk mengecek apakah logo perlu di-invert pada mode gelap
  const needsInversion = (skillName) => {
    const darkLogos = ["Next.js", "Balsamiq"];
    return darkLogos.includes(skillName) && isDark;
  };

  useGSAP(
    () => {
      // Animasi Header
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".skill-header",
          start: "top 80%",
        },
        defaults: { ease: "power4.out", duration: 1.2 }
      });

      // Animasi elemen-elemen
      tl.fromTo(".skill-badge", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
      tl.fromTo(".skill-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.6");
      tl.fromTo(".skill-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.8");

      // Animasi Grid
      gsap.fromTo(
        ".skill-item",
        { y: 30, opacity: 0, scale: 0.9 },
        {
          scrollTrigger: {
            trigger: ".skill-grid",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
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
        <Layout size={75} key="layout" />
      ]}
      orbColors={["from-orange-500/10 to-red-500/10", "from-yellow-500/10 to-amber-500/10"]}
    >
      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="skill-header text-center mb-16 space-y-6">
          <Badge 
            variant="outline" 
            className="skill-badge gap-3 px-4 py-2 text-xs font-medium tracking-wide uppercase bg-(--color-surface) border-(--color-border) text-(--color-text-secondary) backdrop-blur-sm hover:bg-(--color-surface)"
          >
            <span className="inline-flex rounded-full h-2 w-2 bg-(--color-accent)" />
            {t("skills.badge")}
          </Badge>

          <h2 className="skill-title text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-(--color-text-primary)">
            Tech Stack
          </h2>

          <p className="skill-subtitle text-lg md:text-xl max-w-2xl mx-auto text-(--color-text-secondary) font-light">
            {t("skills.subtitle")}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skill-grid max-w-5xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
            {allSkills.map((skill) => (
              <div
                key={skill.name}
                className="skill-item group"
              >
                <div
                  className="flex flex-col items-center gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-(--color-accent) bg-(--color-surface) border-2 border-(--color-border) shadow-sm hover:shadow-md relative overflow-hidden"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-(--color-surface) to-transparent pointer-events-none" />

                  {/* Icon */}
                  <div
                    className="relative z-10 w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      filter: needsInversion(skill.name) ? "invert(1)" : "none",
                    }}
                  >
                    {skill.icon}
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
      </div>
    </ParallaxSection>
  );
});

SkillSection.displayName = "SkillSection";

export default SkillSection;
