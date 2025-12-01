import { useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import { ParallaxSection, Badge } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

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
      value: "Bandung, Indonesia",
      href: `https://maps.google.com/?q=${encodeURIComponent(
        "Bandung, Indonesia"
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
      value: "M Rivan Sahronie",
      href: contactData.linkedin,
      color: "text-blue-600",
    },
    {
      icon: <Github size={24} />,
      label: "GitHub",
      value: "rivaannn",
      href: contactData.github,
      color: "text-gray-800 dark:text-white",
    },
    {
      icon: <Instagram size={24} />,
      label: "Instagram",
      value: "rivaann_",
      href: contactData.instagram,
      color: "text-pink-500",
    },
  ];

  useGSAP(
    () => {
      // Animasi Header
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact-header",
          start: "top 80%",
        },
        defaults: { ease: "power4.out", duration: 1.2 }
      });

      // Animasi elemen-elemen
      tl.fromTo(".contact-badge", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
      tl.fromTo(".contact-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.6");
      tl.fromTo(".contact-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.8");

      // Animasi Grid
      gsap.fromTo(
        ".contact-item",
        { y: 30, opacity: 0, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
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
        <Send size={70} key="send" />
      ]}
      orbColors={["from-green-500/10 to-emerald-500/10", "from-blue-500/10 to-teal-500/10"]}
    >
      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        <div className="contact-header max-w-3xl mx-auto text-center mb-16 space-y-6">
          <Badge 
            variant="outline" 
            className="contact-badge gap-3 px-4 py-2 text-xs font-medium tracking-wide uppercase bg-(--color-surface) border-(--color-border) text-(--color-text-secondary) backdrop-blur-sm hover:bg-(--color-surface)"
          >
            <span className="inline-flex rounded-full h-2 w-2 bg-(--color-accent)" />
            {t("contact.badge")}
          </Badge>

          <h2 className="contact-title text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-(--color-text-primary)">
            {t("contact.title")}
          </h2>

          <p className="contact-subtitle text-lg md:text-xl text-(--color-text-secondary) font-light">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="contact-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contactItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item group flex items-center gap-5 p-6 rounded-2xl bg-(--color-surface) border border-(--color-border) hover:border-(--color-accent) hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl bg-(--color-bg-secondary) flex items-center justify-center text-(--color-text-secondary) group-hover:bg-(--color-accent) group-hover:text-white transition-all duration-300`}>
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
      </div>
    </ParallaxSection>
  );
};

export default ContactSection;
