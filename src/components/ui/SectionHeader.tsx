import { cn } from "@/utils/index";

interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  align?: "center" | "left";
}

const SectionHeader = ({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  align = "center",
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "mb-12 md:mb-20 space-y-4",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {title && (
        <h2
          className={cn(
            "text-3xl md:text-5xl font-bold tracking-tight text-(--color-text-primary)",
            titleClassName
          )}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={cn(
            "text-lg md:text-xl text-(--color-text-secondary) max-w-2xl mx-auto font-light",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
