import { forwardRef } from "react";
import PropTypes from "prop-types";
import { cn } from "@/utils";

const Container = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("container mx-auto px-4 md:px-6", className)}
      {...props}
    >
      {children}
    </div>
  );
});

Container.displayName = "Container";

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Container;
