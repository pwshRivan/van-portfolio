import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  ArrowRight,
  MessageCircle,
  Send,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/index";
import { contactData } from "@/data/index";
import { ParallaxSection, Container, SectionHeader } from "@/components/ui";

const ContactSection = () => {
  const { t } = useTranslation();

  const contactItems = [
    {
      icon: <Mail size={24} />,
      label: t("contact.info.email"),
      value: contactData.email,
      href: `mailto:${contactData.email}`,
    },
    {
      icon: <MapPin size={24} />,
      label: t("contact.info.location"),
      value: contactData.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(
        contactData.location
      )}`,
    },
    {
      icon: <Phone size={24} />,
      label: t("contact.info.phone"),
      value: contactData.phone,
      href: `https://wa.me/${contactData.phone?.replace(/\D/g, "") || ""}`,
    },
    {
      icon: <Linkedin size={24} />,
      label: "LinkedIn",
      value: contactData.linkedinLabel,
      href: contactData.linkedin,
    },
    {
      icon: <Github size={24} />,
      label: "GitHub",
      value: contactData.githubLabel,
      href: contactData.github,
    },
    {
      icon: <Instagram size={24} />,
      label: "Instagram",
      value: contactData.instagramLabel,
      href: contactData.instagram,
    },
  ];

  // Flowing animation - header first, then contact cards
  const containerRef = useScrollAnimation(
    {
      ".contact-title": { y: 40, duration: 800 },
      ".contact-subtitle": { y: 30, delay: 100, duration: 800 },
      ".contact-item": { y: 30, stagger: 80, startDelay: 250, duration: 700 },
    },
    { threshold: 0.15 }
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
          titleClassName="contact-title opacity-0"
          subtitleClassName="contact-subtitle opacity-0"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contactItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item group flex items-center gap-5 p-6 rounded-2xl bg-(--color-surface) border border-(--color-border) hover:border-(--color-accent) hover:shadow-lg hover:-translate-y-1 transition-all duration-300 opacity-0"
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
