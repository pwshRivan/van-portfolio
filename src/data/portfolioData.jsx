import BalsamiqIcon from "../assets/LogoTech/balsamiq.svg";
import BootstrapIcon from "../assets/LogoTech/boostrap.svg";
import CssIcon from "../assets/LogoTech/css.svg";
import FigmaIcon from "../assets/LogoTech/figma.svg";
import GcpIcon from "../assets/LogoTech/gcp.svg";
import GitIcon from "../assets/LogoTech/git.svg";
import HtmlIcon from "../assets/LogoTech/html.svg";
import JavascriptIcon from "../assets/LogoTech/javascript.svg";
import NextIcon from "../assets/LogoTech/nextjs2.svg";
import NodeIcon from "../assets/LogoTech/nodejs.svg";
import ReactIcon from "../assets/LogoTech/reactjs.svg";
import TailwindIcon from "../assets/LogoTech/tailwindcss.svg";
import TypescriptIcon from "../assets/LogoTech/typescript.svg";
import LaravelIcon from "../assets/LogoTech/laravel.svg";
import PhpIcon from "../assets/LogoTech/php.svg";

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
      {
        name: "HTML",
        icon: (
          <img
            src={HtmlIcon}
            alt="HTML"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            className="w-10 h-10"
          />
        ),
      },
      {
        name: "CSS",
        icon: (
          <img
            src={CssIcon}
            alt="CSS"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            className="w-10 h-10"
          />
        ),
      },
      {
        name: "JavaScript",
        icon: (
          <img
            src={JavascriptIcon}
            alt="JavaScript"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            className="w-10 h-10"
          />
        ),
      },
      {
        name: "Typescript",
        icon: (
          <img
            src={TypescriptIcon}
            alt="Typescript"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            className="w-10 h-10"
          />
        ),
      },
      {
        name: "React",
        icon: (
          <img
            src={ReactIcon}
            alt="React"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            className="w-10 h-10"
          />
        ),
      },
      {
        name: "Next.js",
        icon: (
          <img
            src={NextIcon}
            alt="Next.js"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            className="w-10 h-10"
          />
        ),
      },
      {
        name: "Tailwind",
        icon: (
          <img
            src={TailwindIcon}
            alt="Tailwind"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            className="w-10 h-10"
          />
        ),
      },
      {
        name: "Bootstrap",
        icon: (
          <img
            src={BootstrapIcon}
            alt="Bootstrap"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            className="w-10 h-10 object-contain"
          />
        ),
      },
    ],
  },
  backend: {
    title: "Backend",
    skills: [
      {
        name: "Node.js",
        icon: (
          <img
            src={NodeIcon}
            alt="Node.js"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            className="w-10 h-10"
          />
        ),
      },
      {
        name: "PHP",
        icon: (
          <img
            src={PhpIcon}
            alt="PHP"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            className="w-10 h-10"
          />
        ),
      },
      {
        name: "Laravel",
        icon: (
          <img
            src={LaravelIcon}
            alt="Laravel"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            className="w-10 h-10"
          />
        ),
      },
    ],
  },
  tools: {
    title: "Tools & Others",
    skills: [
      {
        name: "Git",
        icon: (
          <img
            src={GitIcon}
            alt="Git"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            className="w-10 h-10"
          />
        ),
      },
      {
        name: "GCP",
        icon: (
          <img
            src={GcpIcon}
            alt="GCP"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            className="w-10 h-10"
          />
        ),
      },
      {
        name: "Figma",
        icon: (
          <img
            src={FigmaIcon}
            alt="Figma"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            className="w-10 h-10"
          />
        ),
      },
      {
        name: "Balsamiq",
        icon: (
          <img
            src={BalsamiqIcon}
            alt="Balsamiq"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            className="w-10 h-10"
          />
        ),
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
    image: "https://placehold.co/600x400/1a1a1a/FFF?text=EWastepas",
    link: "#",
    repo: "#",
  },
  {
    id: 2,
    title: "BabyGrowth",
    desc: "data.babygrowth_desc",
    tech: ["Node.js", "Hapi.js", "GCP", "Machine Learning"],
    image: "https://placehold.co/600x400/1a1a1a/FFF?text=BabyGrowth",
    link: "#",
    repo: "#",
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
