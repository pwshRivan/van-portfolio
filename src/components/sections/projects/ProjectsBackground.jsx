import { memo } from "react";
import { motion as Motion } from "motion/react";
import { Folder, Github } from "lucide-react";

const ProjectsBackground = memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating Icons */}
      <Motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-32 left-1/4 opacity-5"
      >
        <Folder size={85} style={{ color: "var(--color-accent)" }} />
      </Motion.div>
      <Motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
        className="absolute bottom-40 right-1/3 opacity-5"
      >
        <Github size={80} style={{ color: "var(--color-accent)" }} />
      </Motion.div>

      {/* Gradient Orbs */}
      <Motion.div
        animate={{
          x: [0, -35, 0],
          y: [0, 40, 0],
          scale: [1, 1.18, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 w-[400px] h-[400px] bg-linear-to-br from-indigo-500/15 to-purple-500/15 rounded-full blur-3xl"
      />
      <Motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -35, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-20 left-10 w-[420px] h-[420px] bg-linear-to-tr from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl"
      />

      {/* Accent Lines */}
      <div className="absolute top-1/4 left-20 w-40 h-0.5 bg-linear-to-r from-transparent via-(--color-accent) to-transparent opacity-30" />
      <div className="absolute bottom-1/4 right-20 w-36 h-0.5 bg-linear-to-r from-transparent via-(--color-accent) to-transparent opacity-30" />
    </div>
  );
});

ProjectsBackground.displayName = "ProjectsBackground";

export default ProjectsBackground;
