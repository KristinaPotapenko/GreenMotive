import type { RefObject } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animation = (
  ref: RefObject<HTMLElement | null>,
  trigger: HTMLElement | null,
  isTablet: boolean
) => {
  if (!ref.current || !trigger) return;

  const base = {
    scrollTrigger: {
      trigger,
      scrub: true,
    },
  };

  gsap.fromTo(
    ref.current,
    isTablet ? { y: 0, opacity: 1 } : { y: 80, opacity: 0.2 },
    isTablet
      ? {
          y: -80,
          opacity: 0.2,
          ...base,
          scrollTrigger: {
            ...base.scrollTrigger,
            start: "center center",
            end: "+=600px",
          },
        }
      : {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          ...base,
          scrollTrigger: {
            ...base.scrollTrigger,
            start: "-20% center",
            end: "center center",
          },
        }
  );
};
