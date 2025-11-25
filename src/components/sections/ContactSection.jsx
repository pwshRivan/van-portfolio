import { useTranslation } from "react-i18next";
import { motion as Motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { CONTACT } from "@/data/portfolioData";
import { Instagram } from "lucide-react";

const ContactSection = () => {
  const { t } = useTranslation();

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
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const contactItems = [
    {
      icon: <Mail size={24} />,
      label: t("contact.info.email"),
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      icon: <MapPin size={24} />,
      label: t("contact.info.location"),
      value: "Bandung, Indonesia",
      href: `https://maps.google.com/?q=${encodeURIComponent(
        "Bandung, Indonesia"
      )}`,
    },
    {
      icon: <Phone size={24} />,
      label: t("contact.info.phone"),
      value: CONTACT.phone,
      href: `https://wa.me/${CONTACT.phone?.replace(/\D/g, "") || ""}`,
    },
    {
      icon: <Linkedin size={24} />,
      label: "LinkedIn",
      value: "M Rivan Sahronie",
      href: CONTACT.linkedin,
    },
    {
      icon: <Github size={24} />,
      label: "GitHub",
      value: "rivaannn",
      href: CONTACT.github,
    },
    {
      icon: <Instagram size={24} />,
      label: "Instagram",
      value: "rivaann_",
      href: CONTACT.instagram,
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-16 md:py-24 overflow-hidden bg-(--color-bg-primary)"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Icons */}
        <Motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-28 right-1/4 opacity-5"
        >
          <MessageCircle size={85} style={{ color: "var(--color-accent)" }} />
        </Motion.div>
        <Motion.div
          animate={{
            y: [0, 18, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute bottom-32 left-1/4 opacity-5"
        >
          <Mail size={75} style={{ color: "var(--color-accent)" }} />
        </Motion.div>

        {/* Gradient Orbs */}
        <Motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -35, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-10 w-[380px] h-[380px] bg-linear-to-br from-green-500/15 to-emerald-500/15 rounded-full blur-3xl"
        />
        <Motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-10 right-10 w-[360px] h-[360px] bg-linear-to-tl from-blue-500/15 to-teal-500/15 rounded-full blur-3xl"
        />

        {/* Accent Lines */}
        <div className="absolute top-1/3 left-16 w-40 h-0.5 bg-linear-to-r from-transparent via-(--color-accent) to-transparent opacity-30" />
        <div className="absolute bottom-1/3 right-16 w-36 h-0.5 bg-linear-to-r from-transparent via-(--color-accent) to-transparent opacity-30" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-medium bg-(--color-surface) border border-(--color-border) text-(--color-text-secondary) mb-6">
            <span className="inline-flex rounded-full h-2.5 w-2.5 bg-(--color-accent)" />
            {t("contact.get_in_touch")}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-(--color-text-primary)">
            {t("contact.title")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-(--color-text-secondary)">
            {t("contact.subtitle")}
          </p>
        </Motion.div>

        {/* Contact Grid */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {contactItems.map((item) => (
            <Motion.a
              key={item.label}
              variants={itemVariants}
              href={item.href}
              target={item.href?.startsWith("http") ? "_blank" : undefined}
              rel={
                item.href?.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group flex flex-col items-center text-center p-8 rounded-2xl transition-all duration-300 hover:shadow-xl cursor-pointer bg-(--color-bg-secondary) border border-(--color-border) hover:border-(--color-accent)"
            >
              <div className="p-4 rounded-full mb-4 transition-colors bg-(--color-overlay) text-(--color-text-primary) group-hover:bg-(--color-accent) group-hover:text-(--color-bg-primary)">
                {item.icon}
              </div>

              <h3 className="text-sm font-medium mb-2 text-(--color-text-secondary)">
                {item.label}
              </h3>

              <p className="text-lg font-bold text-(--color-text-primary)">
                {item.value}
              </p>
            </Motion.a>
          ))}
        </Motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
