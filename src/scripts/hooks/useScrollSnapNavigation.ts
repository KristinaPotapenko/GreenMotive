import { useEffect, type MutableRefObject, type RefObject } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollSnapNavigation = (
  sectionRefs: RefObject<HTMLElement | null>[],
  isTablet: boolean,
  isAnchorScroll: MutableRefObject<boolean>
) => {
  useEffect(() => {
    let triggers: ScrollTrigger[] = [];
    let scrollTween: gsap.core.Tween | null = null;

    if (ScrollTrigger.isTouch === 1) {
      ScrollTrigger.normalizeScroll(true);
    }

    const goToSection = (i: number) => {
      scrollTween = gsap.to(window, {
        scrollTo: {
          y: isTablet ? i * window.innerHeight + 24 : i * window.innerHeight,
          autoKill: false,
        },
        ease: "none",
        duration: 0.3,
        onComplete: () => {
          scrollTween = null;
        },
        overwrite: true,
      });
    };

    sectionRefs.forEach((ref, i) => {
      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start: isTablet ? "top+=24px bottom" : "top+=40px bottom",
        end: isTablet ? "bottom-=48px top" : "bottom top+=24px",
        onToggle: (self) => {
          if (self.isActive && !scrollTween && !isAnchorScroll.current) {
            goToSection(i);
          }
        },
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [sectionRefs, isTablet]);
};
