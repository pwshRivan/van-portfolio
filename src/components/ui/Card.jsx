import * as React from "react";
import { cva } from "class-variance-authority";
import PropTypes from "prop-types";
import { cn } from "@/utils";

const cardVariants = cva(
  "rounded-xl border bg-card text-card-foreground transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900",
        elevated:
          "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900",
        gradient:
          "border-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20",
        glass:
          "border-neutral-200/50 dark:border-neutral-700/50 bg-white/80 dark:bg-neutral-900/80",
        project:
          "border-2 border-(--color-border) bg-(--color-surface) shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-(--color-accent) rounded-2xl transition-all duration-300",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1",
        glow: "",
        scale: "hover:scale-[1.02]",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      hover: "none",
    },
  }
);

const Card = React.forwardRef(
  ({ className, variant, padding, hover, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, hover }), className)}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-neutral-600 dark:text-neutral-400", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// PropTypes for base components
Card.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    "default",
    "elevated",
    "gradient",
    "glass",
    "project",
  ]),
  padding: PropTypes.oneOf(["none", "sm", "md", "lg"]),
  hover: PropTypes.oneOf(["none", "lift", "glow", "scale"]),
  children: PropTypes.node,
};

CardHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

CardTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

CardDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

CardContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

CardFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
