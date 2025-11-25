import { lazy, Suspense, useState } from "react";
import { SEO, PageLoader, SectionSkeleton } from "@/components";
import MainLayout from "@/layouts/MainLayout";

// Lazy load sections for better performance
const HeroSection = lazy(() => import("@/components/sections/HeroSection"));
const AboutHero = lazy(() => import("@/components/sections/AboutHero"));
const SkillSection = lazy(() => import("@/components/sections/SkillSection"));
const ExperienceSection = lazy(() =>
  import("@/components/sections/ExperienceSection")
);
const EducationSection = lazy(() =>
  import("@/components/sections/EducationSection")
);
const ProjectsSection = lazy(() =>
  import("@/components/sections/ProjectsSection")
);
const ContactSection = lazy(() =>
  import("@/components/sections/ContactSection")
);

/**
 * Portfolio Page
 * Main landing page with all portfolio sections
 */
const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <PageLoader onLoadComplete={handleLoadComplete} />}
      <MainLayout>
        <SEO />
        <div className="relative w-full overflow-hidden">
          {/* Hero Section */}
          <Suspense fallback={<SectionSkeleton />}>
            <HeroSection />
          </Suspense>

          {/* About Section */}
          <Suspense fallback={<SectionSkeleton />}>
            <AboutHero />
          </Suspense>

          {/* Skills Section */}
          <Suspense fallback={<SectionSkeleton />}>
            <SkillSection />
          </Suspense>

          {/* Experience Section */}
          <Suspense fallback={<SectionSkeleton />}>
            <ExperienceSection />
          </Suspense>

          {/* Education Section */}
          <Suspense fallback={<SectionSkeleton />}>
            <EducationSection />
          </Suspense>

          {/* Projects Section */}
          <Suspense fallback={<SectionSkeleton />}>
            <ProjectsSection />
          </Suspense>

          {/* Contact Section */}
          <Suspense fallback={<SectionSkeleton />}>
            <ContactSection />
          </Suspense>
        </div>
      </MainLayout>
    </>
  );
};

export default Portfolio;
