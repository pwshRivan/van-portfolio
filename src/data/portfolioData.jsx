import * as TechIcons from "@/assets/LogoTech";
import * as ProjectImages from "@/assets/images/project";
import { TechIcon } from "@/components/ui";

// Helper function untuk create icon element
const createIcon = (iconSrc, altText, className = "w-10 h-10") => (
  <TechIcon src={iconSrc} alt={altText} className={className} />
);

export const NAV_LINKS = [
  { name: "nav.home", path: "#home" },
  { name: "nav.about", path: "#about" },
  { name: "nav.skills", path: "#skills" },
  { name: "nav.experience", path: "#experience" },
  { name: "nav.education", path: "#education" },
  { name: "nav.projects", path: "#projects" },
  { name: "nav.contact", path: "#contact" },
];

export const SKILL_CATEGORIES = {
  frontend: {
    title: "Frontend",
    skills: [
      { name: "HTML", icon: createIcon(TechIcons.HtmlIcon, "HTML") },
      { name: "CSS", icon: createIcon(TechIcons.CssIcon, "CSS") },
      {
        name: "JavaScript",
        icon: createIcon(TechIcons.JavascriptIcon, "JavaScript"),
      },
      {
        name: "Typescript",
        icon: createIcon(TechIcons.TypescriptIcon, "Typescript"),
      },
      { name: "React", icon: createIcon(TechIcons.ReactIcon, "React") },
      { name: "Next.js", icon: createIcon(TechIcons.NextIcon, "Next.js") },
      {
        name: "Tailwind",
        icon: createIcon(TechIcons.TailwindIcon, "Tailwind"),
      },
      {
        name: "Bootstrap",
        icon: createIcon(
          TechIcons.BootstrapIcon,
          "Bootstrap",
          "w-10 h-10 object-contain"
        ),
      },
    ],
  },
  backend: {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: createIcon(TechIcons.NodeIcon, "Node.js") },
      { name: "PHP", icon: createIcon(TechIcons.PhpIcon, "PHP") },
      { name: "Laravel", icon: createIcon(TechIcons.LaravelIcon, "Laravel") },
    ],
  },
  tools: {
    title: "Tools & Others",
    skills: [
      { name: "Git", icon: createIcon(TechIcons.GitIcon, "Git") },
      { name: "GCP", icon: createIcon(TechIcons.GcpIcon, "GCP") },
      { name: "Figma", icon: createIcon(TechIcons.FigmaIcon, "Figma") },
      {
        name: "Balsamiq",
        icon: createIcon(TechIcons.BalsamiqIcon, "Balsamiq"),
      },
    ],
  },
};

// Keep TOOLS for backward compatibility
export const TOOLS = [
  ...SKILL_CATEGORIES.frontend.skills,
  ...SKILL_CATEGORIES.backend.skills,
  ...SKILL_CATEGORIES.tools.skills,
];

export const PROJECTS_DATA = [
  {
    id: 1,
    title: "EWastepas",
    desc: "data.ewastepas_desc",
    tech: ["React", "Tailwind", "Maps API"],
    image: ProjectImages.ewastepasImg,
    link: "https://ewastepas.my.id",
    repo: "https://github.com/orgs/Ewastepas/repositories",
  },
  {
    id: 2,
    title: "BabyGrowth",
    desc: "data.babygrowth_desc",
    tech: ["Node.js", "Hapi.js", "GCP", "Machine Learning"],
    image: ProjectImages.babygrowthImg,
    link: null,
    repo: "https://github.com/Baby-Growth/backend-babygrowth",
  },
];

export const EXPERIENCE_DATA = [
  {
    id: 1,
    role: "data.exp_gdc_role",
    company: "data.exp_gdc_company",
    period: "Oct 2024 – Sep 2025",
    desc: "data.exp_gdc_desc",
  },
  {
    id: 2,
    role: "data.exp_bangkit_role",
    company: "data.exp_bangkit_company",
    period: "Feb 2024 – Jul 2024",
    desc: "data.exp_bangkit_desc",
  },
  {
    id: 3,
    role: "data.exp_granesia_role",
    company: "data.exp_granesia_company",
    period: "Aug 2019 – Nov 2019",
    desc: "data.exp_granesia_desc",
  },
];

export const EDUCATION_DATA = [
  {
    id: 1,
    school: "data.edu_unpas_school",
    degree: "data.edu_unpas_degree",
    period: "Sep 2021 – Oct 2025",
    desc: "data.edu_unpas_desc",
  },
  {
    id: 2,
    school: "data.edu_smk_school",
    degree: "data.edu_smk_degree",
    period: "Jul 2017 – Jun 2020",
    desc: "data.edu_smk_desc",
  },
];

export const CONTACT = {
  email: "muhamadrivansahronie@gmail.com",
  phone: "+62 87724762167",
  location: "Bandung, Indonesia",
  linkedin: "https://www.linkedin.com/in/rivaannnn",
  github: "https://github.com/rivaannn",
  instagram: "https://www.instagram.com/rivaann_/",
};

export const SEO_DEFAULTS = {
  SITE_TITLE: "M Rivan Sahronie",
  SITE_DESCRIPTION:
    "Portfolio of M Rivan Sahronie, a passionate web developer specializing in modern web technologies",
  SITE_KEYWORDS:
    "Web Developer, React, Node.js, Web Development, Portfolio, M Rivan Sahronie",
  SITE_AUTHOR: "M Rivan Sahronie",
  SITE_IMAGE: "/van.jpg",
  SITE_URL: "https://mrivansahronie.com",
};
