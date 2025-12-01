import { useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";
import { educationData } from "@/data";
import { ParallaxSection, Badge } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Animasi Header
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".edu-header",
          start: "top 80%",
        },
        defaults: { ease: "power4.out", duration: 1.2 }
      });

      // Animasi elemen-elemen
      tl.fromTo(".edu-badge", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
      tl.fromTo(".edu-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.6");
      tl.fromTo(".edu-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.8");

      // Animasi Grid
      gsap.fromTo(
        ".edu-item",
        { y: 30, opacity: 0, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: ".edu-grid",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <ParallaxSection
      id="education"
      className="py-20 md:py-32 bg-(--color-bg-primary)"
      floatingIcons={[
        <GraduationCap size={70} key="grad" />,
        <BookOpen size={60} key="book" />,
        <Award size={65} key="award" />
      ]}
      orbColors={["from-purple-500/10 to-pink-500/10", "from-blue-500/10 to-cyan-500/10"]}
    >
      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="edu-header text-center mb-16 space-y-6">
          <Badge 
            variant="outline" 
            className="edu-badge gap-3 px-4 py-2 text-xs font-medium tracking-wide uppercase bg-(--color-surface) border-(--color-border) text-(--color-text-secondary) backdrop-blur-sm hover:bg-(--color-surface)"
          >
            <span className="inline-flex rounded-full h-2 w-2 bg-(--color-accent)" />
            {t("education.badge")}
          </Badge>

          <h2 className="edu-title text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-(--color-text-primary)">
            {t("education.title")}
          </h2>

          <p className="edu-subtitle text-lg md:text-xl max-w-2xl mx-auto text-(--color-text-secondary) font-light">
            {t("education.subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="edu-grid max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {educationData.map((edu) => (
            <div
              key={edu.id}
              className="edu-item group relative rounded-2xl p-8 bg-(--color-surface) border-2 border-(--color-border) shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-(--color-accent) transition-all duration-300 overflow-hidden"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-(--color-surface) to-transparent pointer-events-none" />

              {/* Icon */}
              <div className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-(--color-surface) text-(--color-text-primary) border border-(--color-border) group-hover:scale-110 transition-transform duration-300">
                <GraduationCap size={28} />
              </div>

              {/* Degree */}
              <h3 className="relative z-10 text-xl md:text-2xl font-medium mb-3 text-(--color-text-primary)">
                {t(edu.degree)}
              </h3>

              {/* School */}
              <div className="relative z-10 flex items-center gap-2 text-base font-medium mb-4 text-(--color-text-secondary)">
                <Award size={18} />
                <span>{t(edu.school)}</span>
              </div>

              {/* Period */}
              <Badge 
                variant="outline"
                className="relative z-10 inline-flex items-center gap-2 px-3 py-1 text-xs font-medium mb-4 bg-(--color-surface) border-(--color-border) text-(--color-text-secondary) hover:bg-(--color-surface)"
              >
                <Calendar size={12} />
                <span>{edu.period}</span>
              </Badge>

              {/* Description */}
              <p className="relative z-10 text-base leading-relaxed text-(--color-text-secondary) font-light">
                {t(edu.desc)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
};

export default EducationSection;
