import { Github, Linkedin, Mail } from "lucide-react";
import { contactData } from "@/data/index";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github size={18} />,
      url: contactData.github,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={18} />,
      url: contactData.linkedin,
    },
    {
      name: "Email",
      icon: <Mail size={18} />,
      url: `mailto:${contactData.email}`,
    },
  ];

  return (
    <footer className="bg-(--color-bg-primary) border-t border-(--color-border)">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-sm text-(--color-text-secondary)">
            © {currentYear}{" "}
            <span className="font-medium text-(--color-text-primary)">
              {contactData.name}
            </span>
            . All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-(--color-text-secondary) hover:text-(--color-text-primary)"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
