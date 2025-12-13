import PropTypes from "prop-types";
import { Code, Layout, Zap, Globe, Sparkles, Terminal } from "lucide-react";
import { cn } from "@/utils";

const HeroBackground = ({ className }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden select-none",
        className
      )}
    >
      {/* Subtle Grid / Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:opacity-20 opacity-40" />

      {/* Floating Aesthetic Icons - Clean & Parallax */}

      {/* Left Side */}
      <div className="floating-icon absolute top-[15%] left-[8%] text-(--color-text-tertiary) opacity-60 blur-[1px]">
        <Code size={48} />
      </div>
      <div className="floating-icon absolute bottom-[25%] left-[12%] text-(--color-text-tertiary) opacity-50">
        <Globe size={64} />
      </div>
      <div className="floating-icon absolute top-[45%] left-[5%] text-(--color-text-tertiary) opacity-40 scale-75">
        <Terminal size={40} />
      </div>

      {/* Right Side */}
      <div className="floating-icon absolute top-[20%] right-[10%] text-(--color-text-tertiary) opacity-60">
        <Layout size={56} />
      </div>
      <div className="floating-icon absolute bottom-[20%] right-[15%] text-(--color-text-tertiary) opacity-50">
        <Zap size={52} />
      </div>
      <div className="floating-icon absolute top-[60%] right-[5%] text-(--color-text-tertiary) opacity-40 blur-[2px] scale-110">
        <Sparkles size={44} />
      </div>
    </div>
  );
};

HeroBackground.propTypes = {
  className: PropTypes.string,
};

export default HeroBackground;
