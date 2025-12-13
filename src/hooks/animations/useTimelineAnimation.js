import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

export const useTimelineAnimation = (
  containerRef,
  timelineCallback,
  options = {}
) => {
  const {
    trigger = null,
    start = "top 85%",
    toggleActions = "play none none reverse",
    defaults = { ease: "power3.out", duration: 1 },
  } = options;

  useEffect(() => {
    if (!containerRef.current || typeof timelineCallback !== "function") return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger || containerRef.current,
        start,
        toggleActions,
      },
      defaults,
    });

    // Call the callback with the timeline
    timelineCallback(tl, containerRef.current);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [containerRef, timelineCallback, trigger, start, toggleActions, defaults]);
};
