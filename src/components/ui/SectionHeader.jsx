import PropTypes from "prop-types";
import { cn } from "@/utils";

const SectionHeader = ({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  align = "center",
}) => {
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

SectionHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  subtitleClassName: PropTypes.string,
  align: PropTypes.oneOf(["center", "left"]),
};

export default SectionHeader;
