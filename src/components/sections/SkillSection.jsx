import { memo } from "react";
import { useTranslation } from "react-i18next";
import { motion as Motion } from "motion/react";
import { Code2, Wrench } from "lucide-react";
import { useTheme } from "@/hooks";
import { SKILL_CATEGORIES } from "@/data/portfolioData";
import { SectionBackground } from "@/components";
import { containerVariants, itemVariants, headerVariants } from "@/utils";

/**
 * Skill Section
 * Displays a grid of technical skills with animations
 * Memoized for performance optimization
 */
const SkillSection = memo(() => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  // Combine all skills from all categories
  const allSkills = [
    ...SKILL_CATEGORIES.frontend.skills,
    ...SKILL_CATEGORIES.backend.skills,
    ...SKILL_CATEGORIES.tools.skills,
  ];

  // Function to check if logo needs inversion for dark mode
  const needsInversion = (skillName) => {
    const darkLogos = ["Next.js", "Balsamiq"];
    return darkLogos.includes(skillName) && isDark;
  };

  return (
    <section
      id="skills"
      className="py-16 md:py-24 relative overflow-hidden bg-(--color-bg-primary)"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Gradient Orbs */}
        <Motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 -left-20 w-96 h-96 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        <Motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-linear-to-tl from-cyan-500/20 to-indigo-500/20 rounded-full blur-3xl"
        />

        {/* Animated Grid Pattern */}
        <Motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px),
                              linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            opacity: 0.3,
          }}
        />

        {/* Floating Code Symbols */}
        <Motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-32 left-1/4 text-6xl opacity-5"
          style={{ color: "var(--color-accent)" }}
        >
          {"</>"}
        </Motion.div>
        <Motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-40 right-1/4 text-7xl opacity-5"
          style={{ color: "var(--color-accent)" }}
        >
          {"{}"}
        </Motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-medium bg-(--color-surface) border border-(--color-border) text-(--color-text-secondary) mb-6">
            <span className="inline-flex rounded-full h-2.5 w-2.5 bg-(--color-accent)" />
            {t("skills.badge")}
          </div>

          <h2
            style={{ color: "var(--color-text-primary)" }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Tech Stack
          </h2>

          <p
            style={{ color: "var(--color-text-secondary)" }}
            className="text-lg max-w-2xl mx-auto"
          >
            {t("skills.subtitle")}
          </p>
        </Motion.div>

        {/* Skills Grid - Animated */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
            {allSkills.map((skill, index) => (
              <Motion.div
                key={skill.name}
                variants={itemVariants}
                className="group"
              >
                <Motion.div
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  style={{
                    backgroundColor: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                  className="flex flex-col items-center gap-3 p-5 rounded-xl transition-all duration-300 hover:border-(--color-accent) hover:shadow-lg relative overflow-hidden"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="absolute inset-0 blur-xl"
                      style={{
                        background:
                          "radial-gradient(circle at center, var(--color-accent) 0%, transparent 70%)",
                        opacity: 0.15,
                      }}
                    />
                  </div>

                  {/* Icon */}
                  <Motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                    style={{
                      filter: needsInversion(skill.name) ? "invert(1)" : "none",
                    }}
                  >
                    {skill.icon}
                  </Motion.div>

                  {/* Name */}
                  <span
                    style={{ color: "var(--color-text-secondary)" }}
                    className="text-xs font-medium text-center leading-tight relative z-10 group-hover:text-(--color-accent) transition-colors duration-300"
                  >
                    {skill.name}
                  </span>
                </Motion.div>
              </Motion.div>
            ))}
          </div>
        </Motion.div>
      </div>
    </section>
  );
});

SkillSection.displayName = "SkillSection";

export default SkillSection;
