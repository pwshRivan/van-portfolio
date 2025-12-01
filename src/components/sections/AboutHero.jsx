import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Download, MapPin, Mail, Code2, Sparkles, Heart } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProfilePhoto from "@/components/ui/ProfilePhoto";
import { ParallaxSection, Badge, Button } from "@/components/ui";
import { useLanguage } from "@/hooks";
import { contactData } from "@/data";
import vanPhoto from "@/assets/images/van.jpg";
import cvEng from "@/assets/cv/cv-english.pdf";
import cvIndo from "@/assets/cv/cv-indonesia.pdf";

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
  const { t } = useTranslation();
  const { isIndonesian } = useLanguage();
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Animasi Konten
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 80%",
        },
        defaults: { ease: "power4.out", duration: 1.2 }
      });

      // Animasi elemen-elemen
      tl.fromTo(".about-badge", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
      tl.fromTo(".about-title-line", { y: 100, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 }, "-=0.6");
      tl.fromTo(".about-text", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 }, "-=0.8");

      // Animasi Foto
      gsap.fromTo(
        ".about-photo-container",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: ".about-photo-container",
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <ParallaxSection
      id="about"
      className="py-20 md:py-32 bg-(--color-bg-primary)"
      floatingIcons={[
        <Code2 size={60} key="code" />,
        <Sparkles size={50} key="sparkles" />,
        <Heart size={55} key="heart" />
      ]}
      orbColors={["from-blue-500/10 to-purple-500/10", "from-cyan-500/10 to-teal-500/10"]}
    >
      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
          {/* Left: Text Content */}
          <div className="about-content space-y-8">
            <Badge 
              variant="outline" 
              className="about-badge gap-3 px-4 py-2 text-xs font-medium tracking-wide uppercase bg-(--color-surface) border-(--color-border) text-(--color-text-secondary) backdrop-blur-sm hover:bg-(--color-surface)"
            >
              <span className="inline-flex rounded-full h-2 w-2 bg-(--color-accent)" />
              {t("about.badge")}
            </Badge>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-(--color-text-primary) tracking-tight">
              <div className="overflow-hidden">
                <span className="about-title-line block">{t("about.title")}</span>
              </div>
            </h1>

            {/* Subtitle */}
            <div className="overflow-hidden">
              <p className="about-title-line text-xl md:text-2xl text-(--color-text-secondary) font-light">
                {t("about.subtitle")}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-6 text-lg leading-relaxed text-(--color-text-secondary) font-light text-justify">
              <p className="about-text">{t("about.p1")}</p>
              <p className="about-text">{t("about.p2")}</p>
            </div>

            {/* Quote */}
            <div className="about-text">
              <blockquote className="pl-6 border-l-2 border-(--color-accent) text-(--color-text-primary) italic text-lg opacity-80">
                {t("about.quote")}
              </blockquote>
            </div>

            {/* Contact Info & Download */}
            <div className="about-text flex flex-col sm:flex-row gap-6 pt-4">
              <Button
                asChild
                size="lg"
                className="group rounded-full font-medium"
              >
                <a
                  href={isIndonesian ? cvIndo : cvEng}
                  download={`CV_M_Rivan_Sahronie_${isIndonesian ? "ID" : "EN"}.pdf`}
                  className="flex items-center gap-3"
                >
                  <Download size={20} />
                  {t("about.download_cv")}
                </a>
              </Button>
              
              <div className="flex flex-col justify-center gap-2 text-sm text-(--color-text-secondary)">
                 <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{contactData.location}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <a href={`mailto:${contactData.email}`} className="hover:text-(--color-text-primary) transition-colors">
                      {contactData.email}
                    </a>
                 </div>
              </div>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="about-photo-container relative lg:pl-10">
            <div className="relative z-10">
              <ProfilePhoto src={vanPhoto} alt="M Rivan Sahronie" />
            </div>
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
};

export default AboutHero;
