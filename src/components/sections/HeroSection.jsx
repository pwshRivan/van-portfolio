import { useRef } from "react";
import { ArrowRight, Code2, Sparkles, Zap, Database, Globe, Cpu, Mouse } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ParallaxSection, Badge, Button } from "@/components/ui";
import { useNavigationStore } from "@/store";

const HeroSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const { setActiveSection } = useNavigationStore();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Animasi elemen-elemen hero
      tl.fromTo(".hero-badge", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
      tl.fromTo(".hero-title-line", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 }, "-=0.8");
      tl.fromTo(".hero-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8");
      tl.fromTo(".hero-buttons", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8");

      // Animasi Orbit Latar Belakang
      gsap.to(".orbit-system", {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "linear",
      });

      gsap.to(".orbit-icon-inner", {
        rotation: -360,
        duration: 40,
        repeat: -1,
        ease: "linear",
      });

      // Indikator Scroll
      gsap.fromTo(
        ".scroll-indicator",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 2 }
      );

      // Animasi Roda Mouse
      gsap.fromTo(
        ".mouse-wheel",
        { y: 0, opacity: 1 },
        {
          y: 10,
          opacity: 0,
          duration: 1.5,
          repeat: -1,
          ease: "power1.inOut",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <ParallaxSection
      id="home"
      className="min-h-screen relative overflow-hidden bg-(--color-bg-primary)"
      floatingIcons={[
        <Code2 size={40} key="code" />,
        <Sparkles size={30} key="sparkles" />,
        <Zap size={35} key="zap" />
      ]}
      orbColors={["from-blue-500/10 to-purple-500/10", "from-cyan-500/10 to-teal-500/10"]}
    >
      <div ref={containerRef} className="container mx-auto px-6 relative flex flex-col items-center justify-center min-h-screen pb-12">
        
        {/* Background Orbit Visual */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] pointer-events-none z-0 opacity-40">
           <div className="orbit-system w-full h-full relative flex items-center justify-center">
              {/* Rings */}
              <div className="absolute w-[60%] h-[60%] border border-(--color-border) rounded-full opacity-30" />
              <div className="absolute w-[85%] h-[85%] border border-(--color-border) rounded-full opacity-20" />
              
              {/* Orbiting Icons */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 w-12 h-12 flex items-center justify-center orbit-icon-inner text-(--color-text-tertiary)">
                 <Database size={24} />
              </div>
              <div className="absolute bottom-[15%] right-[15%] w-12 h-12 flex items-center justify-center orbit-icon-inner text-(--color-text-tertiary)">
                 <Globe size={24} />
              </div>
              <div className="absolute bottom-[15%] left-[15%] w-12 h-12 flex items-center justify-center orbit-icon-inner text-(--color-text-tertiary)">
                 <Cpu size={24} />
              </div>
           </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Status Badge */}
          <Badge 
            variant="outline" 
            className="hero-badge gap-3 px-4 py-2 text-xs font-medium tracking-wide uppercase bg-(--color-surface) border-(--color-border) text-(--color-text-secondary) backdrop-blur-sm mb-8 hover:bg-(--color-surface)"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {t("hero.available")}
          </Badge>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[1.1] text-(--color-text-primary) mb-8">
            <div className="overflow-hidden pb-2">
              <span className="hero-title-line block">
                {t("hero.title_1")}
              </span>
            </div>
            <div className="overflow-hidden pb-2">
              <span className="hero-title-line block">
                <span className="italic font-normal text-(--color-accent)">{t("hero.title_highlight")}</span> {t("hero.title_2")}
              </span>
            </div>
          </h1>

          {/* Subtitle */}
          <div className="overflow-hidden mb-10 max-w-2xl">
            <p className="hero-subtitle text-lg md:text-xl leading-relaxed font-light text-(--color-text-secondary)">
              <Trans
                i18nKey="hero.intro"
                components={{
                  1: <span className="font-medium text-(--color-text-primary)" />,
                }}
              />
            </p>
          </div>

          {/* Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Button
              onClick={() => {
                const element = document.getElementById("about");
                if (element) {
                  const lenis = window.lenis;
                  if (lenis) {
                    lenis.scrollTo(element, {
                      offset: -100,
                      duration: 1.5,
                      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    });
                  } else {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                  setActiveSection("about");
                }
              }}
              className="w-full sm:w-auto group gap-3 text-lg border-none"
              size="lg"
            >
              {t("hero.view_work")}
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 text-(--color-text-tertiary)">
         <div className="relative w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
            <div className="mouse-wheel w-1 h-2 bg-current rounded-full" />
         </div>
      </div>
    </ParallaxSection>
  );
};

export default HeroSection;
