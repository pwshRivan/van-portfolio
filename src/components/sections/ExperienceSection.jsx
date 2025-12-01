import { memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, Building2 } from "lucide-react";
import { experienceData } from "@/data";
import { ParallaxSection, Badge } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = memo(() => {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Animasi Header
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".exp-header",
          start: "top 80%",
        },
        defaults: { ease: "power4.out", duration: 1.2 }
      });

      // Animasi elemen-elemen
      tl.fromTo(".exp-badge", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
      tl.fromTo(".exp-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.6");
      tl.fromTo(".exp-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.8");

      // Animasi Timeline
      const items = gsap.utils.toArray(".timeline-item");
      items.forEach((item, i) => {
        const content = item.querySelector(".timeline-content");
        const node = item.querySelector(".timeline-node");
        
        const itemTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        });

        // Animasi Node muncul
        if (node) {
           itemTl.fromTo(node, 
             { scale: 0, opacity: 0 },
             { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
           );
        }

        // Animasi Konten masuk
        if (content) {
          itemTl.fromTo(content,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.4"
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <ParallaxSection
      id="experience"
      className="py-20 md:py-32 bg-(--color-bg-primary)"
      floatingIcons={[
        <Briefcase size={80} key="briefcase" />,
        <Calendar size={70} key="calendar" />,
        <Building2 size={75} key="building" />
      ]}
      orbColors={["from-indigo-500/10 to-blue-500/10", "from-cyan-500/10 to-teal-500/10"]}
    >
      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="exp-header text-center mb-16 space-y-6">
          <Badge 
            variant="outline" 
            className="exp-badge gap-3 px-4 py-2 text-xs font-medium tracking-wide uppercase bg-(--color-surface) border-(--color-border) text-(--color-text-secondary) backdrop-blur-sm hover:bg-(--color-surface)"
          >
            <span className="inline-flex rounded-full h-2 w-2 bg-(--color-accent)" />
            {t("experience.badge")}
          </Badge>

          <h2 className="exp-title text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-(--color-text-primary)">
            {t("experience.title")}
          </h2>

          <p className="exp-subtitle text-lg md:text-xl max-w-2xl mx-auto text-(--color-text-secondary) font-light">
            {t("experience.subtitle")}
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-(--color-border) -translate-x-1/2">
             <div className="timeline-line absolute top-0 left-0 w-full h-full bg-gradient-to-b from-(--color-accent) via-(--color-accent) to-transparent origin-top" />
          </div>

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <div
                key={exp.id}
                className={`timeline-item relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-(--color-accent) bg-(--color-bg-primary) z-10 timeline-node">
                  <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-(--color-accent)" />
                </div>

                {/* Content Card */}
                <div className="ml-12 md:ml-0 md:w-1/2 timeline-content">
                  <div className={`p-6 rounded-2xl bg-(--color-surface) border-2 border-(--color-border) shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-(--color-accent) transition-all duration-300 group ${
                     index % 2 === 0 ? "md:text-left" : "md:text-right"
                  }`}>
                    {/* Date Badge */}
                    <Badge 
                      variant="outline"
                      className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-medium mb-4 bg-(--color-surface) border-(--color-border) text-(--color-text-secondary) hover:bg-(--color-surface) ${
                       index % 2 === 0 ? "mr-auto" : "ml-auto md:ml-auto md:mr-0"
                    }`}
                    >
                      <Calendar size={12} />
                      <span>{exp.period}</span>
                    </Badge>

                    <h3 className="text-xl font-medium text-(--color-text-primary) mb-1 group-hover:text-(--color-accent) transition-colors">
                      {t(exp.role)}
                    </h3>
                    
                    <div className={`flex items-center gap-2 text-(--color-text-secondary) mb-4 ${
                       index % 2 === 0 ? "justify-start" : "justify-start md:justify-end"
                    }`}>
                       <Briefcase size={16} />
                       <span className="font-medium">{t(exp.company)}</span>
                    </div>

                    <p className="text-sm leading-relaxed text-(--color-text-secondary) font-light">
                      {t(exp.desc)}
                    </p>
                  </div>
                </div>

                {/* Empty Space for Grid alignment */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
});

ExperienceSection.displayName = "ExperienceSection";

export default ExperienceSection;
