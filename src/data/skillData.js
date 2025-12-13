import * as TechIcons from "@/assets/LogoTech";

export const skillData = {
  frontend: {
    title: "Frontend",
    skills: [
      { name: "HTML", icon: TechIcons.HtmlIcon },
      { name: "CSS", icon: TechIcons.CssIcon },
      { name: "JavaScript", icon: TechIcons.JavascriptIcon },
      { name: "Typescript", icon: TechIcons.TypescriptIcon },
      { name: "React", icon: TechIcons.ReactIcon },
      { name: "Next.js", icon: TechIcons.NextIcon },
      { name: "Tailwind", icon: TechIcons.TailwindIcon },
      {
        name: "Bootstrap",
        icon: TechIcons.BootstrapIcon,
        className: "w-10 h-10 object-contain",
      },
    ],
  },
  backend: {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: TechIcons.NodeIcon },
      { name: "PHP", icon: TechIcons.PhpIcon },
      { name: "Laravel", icon: TechIcons.LaravelIcon },
    ],
  },
  tools: {
    title: "Tools & Others",
    skills: [
      { name: "Git", icon: TechIcons.GitIcon },
      { name: "GCP", icon: TechIcons.GcpIcon },
      { name: "Figma", icon: TechIcons.FigmaIcon },
      { name: "Balsamiq", icon: TechIcons.BalsamiqIcon },
    ],
  },
};
