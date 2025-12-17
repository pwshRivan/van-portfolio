import { useTranslation } from "react-i18next";
import {
  Home,
  User,
  Briefcase,
  Code,
  Sparkles,
  Mail,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { navLinks, contactData } from "@/data/index";
import vanPhoto from "@/assets/images/ppvan.jpg";

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  about: User,
  education: GraduationCap,
  experience: Briefcase,
  projects: Code,
  skills: Sparkles,
  contact: Mail,
};

interface MobileMenuProps {
  isOpen: boolean;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onClose: () => void;
}

export default function MobileMenu({
  isOpen,
  activeSection,
  onNavigate,
  onClose,
}: MobileMenuProps) {
  const { t } = useTranslation();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300 ease-in-out lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-4 bottom-4 right-4 w-[280px] bg-(--color-bg-primary) z-60 rounded-3xl shadow-2xl transform transition-transform duration-300 cubic-bezier(0.32, 0.72, 0, 1) lg:hidden flex flex-col overflow-hidden border border-(--color-border) ${
          isOpen ? "translate-x-0" : "translate-x-[calc(100%+20px)]"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Profile */}
        <div className="p-6 pb-4 border-b border-(--color-border) bg-(--color-bg-secondary)/50">
          <div className="flex flex-col gap-3">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-(--color-border) shadow-sm">
              <img
                src={vanPhoto}
                alt={contactData.name}
                className="w-full h-full object-cover"
                loading="lazy"
                width="64"
                height="64"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg text-(--color-text-primary)">
                {contactData.name}
              </h3>
              <p className="text-xs font-medium text-(--color-text-secondary) bg-(--color-overlay) inline-block px-2 py-1 rounded-md mt-1">
                Web Developer
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 overscroll-contain">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const sectionId = link.path.replace("#", "");
              const isActive = activeSection === sectionId;
              const Icon = iconMap[sectionId] || Home;

              return (
                <button
                  key={link.path}
                  onClick={() => onNavigate(sectionId)}
                  className={`relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group w-full text-left ${
                    isActive
                      ? "bg-(--color-accent) text-(--color-bg-primary) shadow-md"
                      : "text-(--color-text-secondary) hover:bg-(--color-bg-secondary) hover:text-(--color-text-primary)"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={`transition-colors shrink-0 ${
                      isActive
                        ? "text-(--color-bg-primary)"
                        : "text-(--color-text-tertiary) group-hover:text-(--color-text-primary)"
                    }`}
                  />
                  <span
                    className={`text-sm tracking-wide ${
                      isActive ? "font-bold" : "font-medium"
                    }`}
                  >
                    {t(link.name)}
                  </span>

                  {isActive && (
                    <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-(--color-bg-primary)" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-(--color-border) bg-(--color-bg-secondary)/30">
          <p className="text-[10px] text-center text-(--color-text-tertiary) uppercase tracking-widest font-semibold opacity-60">
            © {new Date().getFullYear()} {contactData.name}
          </p>
        </div>
      </div>
    </>
  );
}
