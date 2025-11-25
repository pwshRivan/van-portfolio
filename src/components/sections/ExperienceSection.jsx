import { memo } from "react";
import { useTranslation } from "react-i18next";
import { motion as Motion } from "motion/react";
import { Briefcase, Calendar } from "lucide-react";
import { EXPERIENCE_DATA } from "@/data/portfolioData";

/**
 * Experience Section with Animated Timeline Design
 */
const ExperienceSection = memo(() => {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="experience"
      className="py-16 md:py-24 relative overflow-hidden bg-(--color-bg-primary)"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Icons */}
        <Motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-32 left-1/4 opacity-5"
        >
          <Briefcase size={80} style={{ color: "var(--color-accent)" }} />
        </Motion.div>
        <Motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-40 right-1/3 opacity-5"
        >
          <Calendar size={70} style={{ color: "var(--color-accent)" }} />
        </Motion.div>

        {/* Gradient Orbs - More Prominent */}
        <Motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-0 w-[400px] h-[400px] bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        <Motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 left-0 w-[350px] h-[350px] bg-linear-to-tr from-cyan-500/15 to-indigo-500/15 rounded-full blur-3xl"
        />

        {/* Accent Lines - Decorative */}
        <div className="absolute top-40 left-20 w-40 h-0.5 bg-linear-to-r from-transparent via-(--color-accent) to-transparent opacity-30" />
        <div className="absolute bottom-40 right-20 w-32 h-0.5 bg-linear-to-r from-transparent via-(--color-accent) to-transparent opacity-30" />
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
            {t("experience.badge")}
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-(--color-text-primary)">
            {t("experience.title")}
          </h2>

          <p className="text-lg text-(--color-text-secondary) max-w-2xl mx-auto">
            {t("experience.subtitle")}
          </p>
        </Motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Simple Timeline Line */}
          <Motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={lineVariants}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-(--color-border) md:-translate-x-1/2 origin-top"
          />

          {/* Timeline Items */}
          <Motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="space-y-12"
          >
            {EXPERIENCE_DATA.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <Motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Node */}
                  <Motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      delay: idx * 0.1,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="absolute left-8 md:left-1/2 w-5 h-5 rounded-full bg-(--color-accent) border-4 border-(--color-bg-primary) md:-translate-x-1/2 z-10"
                  />

                  {/* Spacer for desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-1/2 pl-20 md:pl-0 ${
                      isEven ? "md:pl-8" : "md:pr-8"
                    }`}
                  >
                    <Motion.div
                      className="group rounded-2xl p-6 md:p-8 bg-(--color-bg-secondary) border border-(--color-border) hover:border-(--color-accent) transition-all duration-300"
                      style={{ willChange: "transform, opacity" }}
                    >
                      {/* Period Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 bg-(--color-accent) text-(--color-bg-primary)">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>

                      {/* Role */}
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-(--color-text-primary) group-hover:text-(--color-accent) transition-colors">
                        {t(exp.role)}
                      </h3>

                      {/* Company */}
                      <div className="flex items-center gap-2 text-base font-semibold mb-4 text-(--color-text-secondary)">
                        <Briefcase size={18} />
                        <span>{t(exp.company)}</span>
                      </div>

                      {/* Description */}
                      <p className="text-base leading-relaxed text-(--color-text-secondary)">
                        {t(exp.desc)}
                      </p>
                    </Motion.div>
                  </div>
                </Motion.div>
              );
            })}
          </Motion.div>
        </div>
      </div>
    </section>
  );
});

ExperienceSection.displayName = "ExperienceSection";

export default ExperienceSection;
