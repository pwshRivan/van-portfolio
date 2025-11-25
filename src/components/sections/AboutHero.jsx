import { useTranslation } from "react-i18next";
import { Download, MapPin, Mail, Code2, Sparkles } from "lucide-react";
import { motion as Motion } from "motion/react";
import ProfilePhoto from "@/components/ui/ProfilePhoto";
import { useLanguage } from "@/hooks";
import { CONTACT } from "@/data/portfolioData";
import vanPhoto from "@/assets/images/van.jpg";
import cvEng from "@/assets/cv/cv-english.pdf";
import cvIndo from "@/assets/cv/cv-indonesia.pdf";

const AboutHero = () => {
  const { t } = useTranslation();
  const { isIndonesian } = useLanguage();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const photoVariants = {
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

  return (
    <section
      id="about"
      className="relative py-16 md:py-24 overflow-hidden bg-(--color-bg-primary)"
    >
      {/* Animated Background Decorations */}
      <Motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
        className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20"
      />

      <Motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 60%)",
        }}
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full blur-3xl opacity-10"
      />

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
        className="absolute top-32 left-[10%] opacity-10"
      >
        <Code2 size={40} className="text-(--color-accent)" />
      </Motion.div>

      <Motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-32 right-[15%] opacity-10"
      >
        <Sparkles size={35} className="text-(--color-accent)" />
      </Motion.div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px),
                           linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left: Text Content */}
          <Motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <Motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-medium bg-(--color-surface) border border-(--color-border) text-(--color-text-secondary)"
            >
              <Motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex rounded-full h-2.5 w-2.5 bg-(--color-accent)"
              />
              {t("about.badge")}
            </Motion.div>

            {/* Title */}
            <Motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-(--color-text-primary)"
            >
              {t("about.title")}
            </Motion.h1>

            {/* Subtitle */}
            <Motion.p
              variants={itemVariants}
              className="text-xl text-(--color-text-secondary)"
            >
              {t("about.subtitle")}
            </Motion.p>

            {/* Description */}
            <Motion.div
              variants={itemVariants}
              className="space-y-4 leading-relaxed text-(--color-text-secondary)"
            >
              <Motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                {t("about.p1")}
              </Motion.p>
              <Motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {t("about.p2")}
              </Motion.p>
            </Motion.div>

            {/* Quote */}
            <Motion.blockquote
              variants={itemVariants}
              whileHover={{ x: 5 }}
              className="pl-4 italic border-l-4 border-(--color-accent) text-(--color-text-secondary)"
            >
              {t("about.quote")}
            </Motion.blockquote>

            {/* Contact Info */}
            <Motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 pt-4"
            >
              <Motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-sm text-(--color-text-secondary)"
              >
                <MapPin size={16} className="text-(--color-text-primary)" />
                <span>{CONTACT.location}</span>
              </Motion.div>
              <Motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-sm text-(--color-text-secondary)"
              >
                <Mail size={16} className="text-(--color-text-primary)" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-(--color-accent) transition-colors"
                >
                  {CONTACT.email}
                </a>
              </Motion.div>
            </Motion.div>

            {/* Download CV Button */}
            <Motion.a
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={isIndonesian ? cvIndo : cvEng}
              download={`CV_M_Rivan_Sahronie_${isIndonesian ? "ID" : "EN"}.pdf`}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all bg-(--color-accent) text-(--color-bg-primary) shadow-(--shadow-lg) hover:shadow-(--shadow-xl)"
            >
              <Motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Download size={20} />
              </Motion.div>
              {t("about.download_cv")}
            </Motion.a>
          </Motion.div>

          {/* Right: Photo with decorative elements */}
          <Motion.div
            variants={photoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Decorative rings around photo */}
            <Motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full opacity-20"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, var(--color-accent), transparent)",
              }}
            />

            <Motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 rounded-full opacity-10"
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background:
                    "conic-gradient(from 90deg, transparent, var(--color-accent), transparent)",
                }}
              />
            </Motion.div>

            {/* Floating dots around photo */}
            {[0, 1, 2, 3].map((i) => (
              <Motion.div
                key={i}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                className="absolute w-3 h-3 bg-(--color-accent) rounded-full"
                style={{
                  top: `${20 + i * 20}%`,
                  right: i % 2 === 0 ? "-10%" : "auto",
                  left: i % 2 === 1 ? "-10%" : "auto",
                }}
              />
            ))}

            {/* Photo with hover effect */}
            <Motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ProfilePhoto src={vanPhoto} alt="M Rivan Sahronie" />
            </Motion.div>

            {/* Glow effect behind photo */}
            <Motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-(--color-accent) rounded-full blur-3xl opacity-20 -z-10"
            />
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
