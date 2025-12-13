import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGSAP } from "@gsap/react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  MessageCircle,
  Instagram,
  Send,
  ArrowRight,
} from "lucide-react";
import { contactData } from "@/data";
import { ParallaxSection, Container, SectionHeader } from "@/components/ui";
import { gsap } from "@/lib/gsap";

const ContactSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const contactItems = [
    {
      icon: <Mail size={24} />,
      label: t("contact.info.email"),
      value: contactData.email,
      href: `mailto:${contactData.email}`,
      color: "text-blue-500",
    },
    {
      icon: <MapPin size={24} />,
      label: t("contact.info.location"),
      value: contactData.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(
        contactData.location
      )}`,
      color: "text-red-500",
    },
    {
      icon: <Phone size={24} />,
      label: t("contact.info.phone"),
      value: contactData.phone,
      href: `https://wa.me/${contactData.phone?.replace(/\D/g, "") || ""}`,
      color: "text-green-500",
    },
    {
      icon: <Linkedin size={24} />,
      label: "LinkedIn",
      value: contactData.linkedinLabel,
      href: contactData.linkedin,
      color: "text-blue-600",
    },
    {
      icon: <Github size={24} />,
      label: "GitHub",
      value: contactData.githubLabel,
      href: contactData.github,
      color: "text-gray-800 dark:text-white",
    },
    {
      icon: <Instagram size={24} />,
      label: "Instagram",
      value: contactData.instagramLabel,
      href: contactData.instagram,
      color: "text-pink-500",
    },
  ];

  // Animations
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".contact-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
      tl.fromTo(
        ".contact-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

      gsap.fromTo(
        ".contact-item",
        { y: 30, scale: 0.95, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-grid",
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
      id="contact"
      className="py-20 md:py-32 bg-(--color-bg-primary)"
      floatingIcons={[
        <MessageCircle size={85} key="msg" />,
        <Mail size={75} key="mail" />,
        <Send size={70} key="send" />,
      ]}
      orbColors={[
        "from-green-500/10 to-emerald-500/10",
        "from-blue-500/10 to-teal-500/10",
      ]}
    >
      <Container ref={containerRef}>
        <SectionHeader
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
          className="contact-header"
          titleClassName="contact-title"
          subtitleClassName="contact-subtitle"
        />

        <div className="contact-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contactItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item group flex items-center gap-5 p-6 rounded-2xl bg-(--color-surface) border border-(--color-border) hover:border-(--color-accent) hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-(--color-bg-secondary) flex items-center justify-center text-(--color-text-secondary) group-hover:bg-(--color-accent) group-hover:text-(--color-bg-primary) transition-all duration-300">
                {item.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium text-(--color-text-primary) mb-0.5 group-hover:text-(--color-accent) transition-colors">
                  {item.label}
                </h3>
                <p className="text-sm text-(--color-text-secondary) truncate font-light opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.value}
                </p>
              </div>

              <div className="text-(--color-text-tertiary) group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight size={18} />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </ParallaxSection>
  );
};

export default ContactSection;
