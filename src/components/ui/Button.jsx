import * as React from "react";
import { cva } from "class-variance-authority";
import PropTypes from "prop-types";
import { cn } from "@/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-(--color-accent) text-(--color-bg-primary) hover:opacity-90 shadow-md hover:shadow-lg hover:-translate-y-0.5",
        secondary:
          "bg-(--color-bg-secondary) text-(--color-text-primary) hover:bg-(--color-bg-tertiary) border border-(--color-border)",
        outline:
          "border-2 border-(--color-border) bg-transparent text-(--color-text-primary) hover:bg-(--color-surface) hover:text-(--color-text-primary)",
        ghost:
          "bg-transparent text-(--color-text-primary) hover:bg-(--color-surface)",
        gradient:
          "bg-linear-to-r from-(--color-accent) to-purple-600 text-white shadow-lg",
        danger: "bg-red-500 text-white hover:bg-red-600",
        success: "bg-emerald-500 text-white hover:bg-emerald-600",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
        auto: "h-auto px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  (
    {
      children,
      onClick,
      variant = "primary",
      size = "default",
      className = "",
      isLoading = false,
      disabled = false,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? "span" : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        onClick={onClick}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "outline",
    "ghost",
    "gradient",
    "danger",
    "success",
  ]),
  size: PropTypes.oneOf(["sm", "default", "lg", "icon", "auto"]),
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  asChild: PropTypes.bool,
};

export default Button;
