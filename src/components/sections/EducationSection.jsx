import { useTranslation } from "react-i18next";
import { motion as Motion } from "motion/react";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";
import { EDUCATION_DATA } from "@/data/portfolioData";

/**
 * Education Section with Compact Grid Design
 */
const EducationSection = () => {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section
      id="education"
      className="py-16 md:py-24 relative overflow-hidden bg-(--color-bg-primary)"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Icons */}
        <Motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-40 right-1/4 opacity-5"
        >
          <GraduationCap size={90} style={{ color: "var(--color-accent)" }} />
        </Motion.div>
        <Motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-32 left-1/3 opacity-5"
        >
          <BookOpen size={75} style={{ color: "var(--color-accent)" }} />
        </Motion.div>

        {/* Gradient Orbs */}
        <Motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-10 w-[350px] h-[350px] bg-linear-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"
        />
        <Motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 35, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute bottom-10 right-10 w-[380px] h-[380px] bg-linear-to-tl from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl"
        />

        {/* Accent Lines */}
        <div className="absolute top-1/3 right-10 w-36 h-0.5 bg-linear-to-r from-transparent via-(--color-accent) to-transparent opacity-30" />
        <div className="absolute bottom-1/3 left-10 w-32 h-0.5 bg-linear-to-r from-transparent via-(--color-accent) to-transparent opacity-30" />
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
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-medium bg-(--color-surface) border border-(--color-border) text-(--color-text-primary) mb-6">
            <span className="inline-flex rounded-full h-2.5 w-2.5 bg-(--color-accent)" />
            {t("education.badge")}
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-(--color-text-primary)">
            {t("education.title")}
          </h2>

          <p className="text-lg text-(--color-text-secondary) max-w-2xl mx-auto">
            {t("education.subtitle")}
          </p>
        </Motion.div>

        {/* Education Grid */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6"
        >
          {EDUCATION_DATA.map((edu) => (
            <Motion.div
              key={edu.id}
              variants={itemVariants}
              className="group relative rounded-2xl p-8 bg-(--color-bg-primary) border-2 border-(--color-border) hover:border-(--color-accent) transition-all duration-300"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-(--color-accent) group-hover:scale-110 transition-transform">
                <GraduationCap
                  size={28}
                  className="text-(--color-bg-primary)"
                />
              </div>

              {/* Degree */}
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-(--color-text-primary) group-hover:text-(--color-accent) transition-colors">
                {t(edu.degree)}
              </h3>

              {/* School */}
              <div className="flex items-center gap-2 text-base font-semibold mb-4 text-(--color-text-secondary)">
                <Award size={18} />
                <span>{t(edu.school)}</span>
              </div>

              {/* Period */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4 bg-(--color-overlay) text-(--color-text-secondary) w-fit">
                <Calendar size={14} />
                <span>{edu.period}</span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-(--color-text-secondary)">
                {t(edu.desc)}
              </p>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
