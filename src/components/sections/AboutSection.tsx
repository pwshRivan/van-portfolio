import { useTranslation } from "react-i18next";
import { Download, MapPin, Mail, Code2, Sparkles, Heart } from "lucide-react";
import ProfilePhoto from "@/components/ui/ProfilePhoto";
import { ParallaxSection, Button, Container } from "@/components/ui";
import { useLanguage, useScrollAnimation } from "@/hooks/index";
import { contactData } from "@/data/index";
import vanPhoto from "@/assets/images/van.jpg";
import cvEng from "@/assets/cv/cv-english.pdf";
import cvIndo from "@/assets/cv/cv-indonesia.pdf";

const AboutSection = () => {
  const { t } = useTranslation();
  const { isIndonesian } = useLanguage();

  // Flowing animation - elements appear in sequence
  const containerRef = useScrollAnimation(
    {
      ".about-title": { y: 40, duration: 800 },
      ".about-subtitle": { y: 40, delay: 100, duration: 800 },
      ".about-text": { y: 30, stagger: 100, startDelay: 200, duration: 800 },
      ".about-photo": { y: 50, delay: 300, duration: 1000 },
    },
    { threshold: 0.15 }
  );

  return (
    <ParallaxSection
      id="about"
      className="py-20 md:py-32 bg-(--color-bg-primary)"
      floatingIcons={[
        <Code2 size={60} key="code" />,
        <Sparkles size={50} key="sparkles" />,
        <Heart size={55} key="heart" />,
      ]}
      orbColors={[
        "from-blue-500/10 to-purple-500/10",
        "from-cyan-500/10 to-teal-500/10",
      ]}
    >
      <Container ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
          {/* Left: Text Content */}
          <div className="about-content space-y-8">
            <h1 className="about-title text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-(--color-text-primary) tracking-tight opacity-0">
              {t("about.title")}
            </h1>

            <p className="about-subtitle text-xl md:text-2xl text-(--color-text-secondary) font-light opacity-0">
              {t("about.subtitle")}
            </p>

            <div className="space-y-6 text-lg leading-relaxed text-(--color-text-secondary) font-light text-justify">
              <p className="about-text opacity-0">{t("about.p1")}</p>
              <p className="about-text opacity-0">{t("about.p2")}</p>
            </div>

            <div className="about-text opacity-0">
              <blockquote className="pl-6 border-l-2 border-(--color-accent) text-(--color-text-primary) italic text-lg opacity-80">
                {t("about.quote")}
              </blockquote>
            </div>

            <div className="about-text flex flex-col sm:flex-row gap-6 pt-4 opacity-0">
              <Button
                asChild
                size="lg"
                className="group rounded-full font-medium"
              >
                <a
                  href={isIndonesian ? cvIndo : cvEng}
                  download={`CV_${contactData.name.replace(/ /g, "_")}_${
                    isIndonesian ? "ID" : "EN"
                  }.pdf`}
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
                  <a
                    href={`mailto:${contactData.email}`}
                    className="hover:text-(--color-text-primary) transition-colors"
                  >
                    {contactData.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="about-photo relative lg:pl-10 opacity-0">
            <div className="relative z-10">
              <ProfilePhoto src={vanPhoto} alt={contactData.name} />
            </div>
          </div>
        </div>
      </Container>
    </ParallaxSection>
  );
};

export default AboutSection;
