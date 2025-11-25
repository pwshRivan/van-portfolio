import { useEffect } from "react";

export const useScrollLock = (isLocked) => {
  useEffect(() => {
    const lenis = window.lenis;

    if (isLocked) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = "unset";
      lenis?.start();
    };
  }, [isLocked]);
};
