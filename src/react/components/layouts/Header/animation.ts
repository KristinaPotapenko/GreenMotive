import type { RefObject } from "react";
import gsap from "gsap";

export const animation = (ref: RefObject<HTMLElement | null>) => {
  if (!ref.current) return;

  gsap.fromTo(
    ref.current,
    {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.2,
    }
  );
};
