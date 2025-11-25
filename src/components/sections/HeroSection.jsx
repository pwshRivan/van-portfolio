import { ArrowRight } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";
import { motion as Motion } from "motion/react";

const HeroSection = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
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

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden pt-20 md:pt-0"
    >
      {/* Content */}
      <Motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto flex flex-col items-center gap-8 md:gap-10"
      >
        {/* Status Badge */}
        <Motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-medium bg-(--color-surface) border border-(--color-border) text-(--color-text-secondary)"
        >
          <Motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex rounded-full h-2.5 w-2.5 bg-(--color-accent)"
          />
          {t("hero.available")}
        </Motion.div>

        {/* Main Title with Word Animation */}
        <Motion.h1
          variants={titleContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] md:leading-[1.1] max-w-4xl text-(--color-text-primary)"
        >
          <Motion.span variants={wordVariants} className="inline-block mr-3">
            {t("hero.title_1")}
          </Motion.span>
          <Motion.span
            variants={wordVariants}
            className="inline-block mr-3 italic text-(--color-text-tertiary)"
          >
            {t("hero.title_highlight")}
          </Motion.span>
          <Motion.span variants={wordVariants} className="inline-block">
            {t("hero.title_2")}
          </Motion.span>
        </Motion.h1>

        {/* Subtitle */}
        <Motion.p
          variants={itemVariants}
          className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light text-(--color-text-secondary)"
        >
          <Trans
            i18nKey="hero.intro"
            components={{
              1: <span className="font-semibold text-(--color-text-primary)" />,
            }}
          />
        </Motion.p>

        {/* Buttons */}
        <Motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4 w-full sm:w-auto"
        >
          <a href="#about" className="w-full sm:w-auto">
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium text-lg transition-all duration-200 bg-(--color-accent) text-(--color-bg-primary)"
            >
              {t("hero.view_work")}
              <Motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={18} />
              </Motion.div>
            </Motion.button>
          </a>
        </Motion.div>
      </Motion.div>

      {/* Scroll Indicator */}
      <Motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          background: `linear-gradient(to bottom, transparent, var(--color-border), transparent)`,
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16"
      >
        <Motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-(--color-accent) rounded-full absolute top-0 left-1/2 -translate-x-1/2"
        />
      </Motion.div>
    </section>
  );
};

export default HeroSection;
