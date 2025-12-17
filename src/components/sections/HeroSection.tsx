import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { animate } from "animejs";
import { Code, Layout, Zap, Globe, Sparkles, Terminal } from "lucide-react";
import { useTypingEffect } from "@/hooks/index";
import { cn, smoothScrollTo, floatingAnimation } from "@/utils/index";
import type { TFunction } from "i18next";

// Hero Background
const HeroBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay z-0" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:opacity-20 opacity-40" />

    {/* Floating Icons */}
    <div className="floating-icon absolute top-[15%] left-[8%] text-(--color-text-tertiary) opacity-60 blur-[1px]">
      <Code size={48} />
    </div>
    <div className="floating-icon absolute bottom-[25%] left-[12%] text-(--color-text-tertiary) opacity-50">
      <Globe size={64} />
    </div>
    <div className="floating-icon absolute top-[45%] left-[5%] text-(--color-text-tertiary) opacity-40 scale-75">
      <Terminal size={40} />
    </div>
    <div className="floating-icon absolute top-[20%] right-[10%] text-(--color-text-tertiary) opacity-60">
      <Layout size={56} />
    </div>
    <div className="floating-icon absolute bottom-[20%] right-[15%] text-(--color-text-tertiary) opacity-50">
      <Zap size={52} />
    </div>
    <div className="floating-icon absolute top-[60%] right-[5%] text-(--color-text-tertiary) opacity-40 blur-[2px] scale-110">
      <Sparkles size={44} />
    </div>
  </div>
);

interface HeroContentProps {
  t: TFunction;
  typedName: string;
}

// Hero Content
const HeroContent = ({ t, typedName }: HeroContentProps) => (
  <div className="w-full max-w-360 flex flex-col items-center gap-6 md:gap-8">
    <div className="hero-text-reveal overflow-hidden">
      <p className="hero-intro font-mono text-(--color-accent) text-sm md:text-lg tracking-[0.2em] uppercase font-bold opacity-0">
        {t("hero.title_1")}
      </p>
    </div>

    <div className="relative w-full min-h-20 sm:min-h-24 md:min-h-32 flex items-center justify-center">
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-(--color-text-primary) whitespace-nowrap overflow-visible">
        <span>{typedName}</span>
        <span className="text-sky-500">.</span>
        <span className="animate-pulse inline-block">|</span>
      </h1>
    </div>

    <div className="hero-text-reveal overflow-hidden max-w-2xl mt-2">
      <p className="hero-desc text-base md:text-xl text-(--color-text-secondary) leading-relaxed font-medium opacity-0">
        {t("hero.description")}
      </p>
    </div>
  </div>
);

interface HeroActionsProps {
  t: TFunction;
  className?: string;
}

// Hero Actions
const HeroActions = ({ t, className }: HeroActionsProps) => {
  const handleScroll =
    (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      smoothScrollTo(sectionId, 80);
    };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center gap-6 opacity-0",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <a
          href="#contact"
          onClick={handleScroll("contact")}
          className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-(--color-accent) text-(--color-bg-primary) rounded-full hover:opacity-90 transition-all duration-300 font-semibold tracking-wide shadow-lg shadow-(--color-accent)/20 hover:shadow-(--color-accent)/40 hover:-translate-y-1 overflow-hidden"
        >
          <span className="relative z-10">{t("hero.cta_primary")}</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </a>

        <a
          href="#projects"
          onClick={handleScroll("projects")}
          className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-(--color-border) text-(--color-text-primary) rounded-full hover:bg-(--color-bg-secondary) transition-all duration-300 font-semibold tracking-wide hover:-translate-y-1"
        >
          {t("hero.cta_secondary")}
        </a>
      </div>
    </div>
  );
};

// Hero Section main
const HeroSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const fullName = t("hero.title_highlight");

  const typedName = useTypingEffect(fullName, {
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseAfterTyping: 2000,
    pauseAfterDeleting: 500,
    initialDelay: 500,
    loop: true,
  });

  // Floating icons animation
  useEffect(() => {
    if (!containerRef.current) return;

    const icons = containerRef.current.querySelectorAll(".floating-icon");
    const animations: (ReturnType<typeof animate> | undefined)[] = [];

    icons.forEach((icon, i) => {
      animations.push(floatingAnimation(icon, { delay: i * 200 }));
    });

    return () =>
      animations.forEach((anim) => {
        if (anim && "pause" in anim) {
          anim.pause();
        }
      });
  }, []);

  // Main content animations - flowing entrance
  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    hasAnimated.current = true;

    const intro = containerRef.current.querySelector(".hero-intro");
    const desc = containerRef.current.querySelector(".hero-desc");
    const actions = containerRef.current.querySelector(".hero-actions");

    // Flowing animation sequence
    if (intro) {
      animate(intro, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 200,
        ease: "outCubic",
      });
    }

    if (desc) {
      animate(desc, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 400,
        ease: "outCubic",
      });
    }

    if (actions) {
      animate(actions, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 600,
        ease: "outCubic",
      });
    }
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-(--color-bg-primary) text-(--color-text-primary) transition-colors duration-700"
    >
      <HeroBackground />

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center min-h-[80vh] text-center">
        <HeroContent t={t} typedName={typedName} />
        <HeroActions t={t} className="hero-actions mt-8" />
      </div>
    </section>
  );
};

export default HeroSection;
