import { useEffect, useRef, type RefObject } from "react";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Hero } from "../../sections/Hero/Hero";
import { Mission } from "../../sections/Mission/Mission";
import { Priorities } from "../../sections/Priorities/Priorities";
import { Vision } from "../../sections/Vision/Vision";
import { useLocation } from "react-router-dom";
import { useWindowWidth } from "../../../scripts/hooks/useWindowWidth";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const Home = () => {
  const windowWidth = useWindowWidth();
  const isTablet = windowWidth <= 1023;

  const location = useLocation();

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroFirstSectionRef = useRef<HTMLDivElement | null>(null);
  const heroSecondSectionRef = useRef<HTMLDivElement | null>(null);

  const missionSectionRef = useRef<HTMLElement | null>(null);
  const prioritiesSectionRef = useRef<HTMLElement | null>(null);
  const visionSectionRef = useRef<HTMLElement | null>(null);

  const isAnchorScroll = useRef(false);

  const sectionRefs: RefObject<HTMLElement | null>[] = isTablet
    ? [
        heroFirstSectionRef,
        heroSecondSectionRef,
        missionSectionRef,
        prioritiesSectionRef,
        visionSectionRef,
      ]
    : [
        heroSectionRef,
        missionSectionRef,
        prioritiesSectionRef,
        visionSectionRef,
      ];

  useEffect(() => {
    let observer: any;
    let scrollTween: gsap.core.Tween | null = null;

    if (ScrollTrigger.isTouch === 1) {
      observer = ScrollTrigger.normalizeScroll(true);
    }

    document.addEventListener(
      "touchstart",
      (e) => {
        if (scrollTween) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      },
      { capture: true, passive: false }
    );

    function goToSection(i: number) {
      scrollTween = gsap.to(window, {
        scrollTo: {
          y: isTablet ? i * window.innerHeight + 24 : i * window.innerHeight,
          autoKill: false,
        },
        onStart: () => {
          if (!observer) return;
          observer.disable();
          observer.enable();
        },
        ease: "none",
        duration: 0.3,
        onComplete: () => {
          scrollTween = null;
        },
        overwrite: true,
      });
    }

    sectionRefs.forEach((sectionRef, i) => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: isTablet ? "top+=24px bottom" : "top+=40px bottom",
        end: isTablet ? "bottom-=48px top" : "bottom top+=24px",
        onToggle: (self) => {
          if (self.isActive && !scrollTween && !isAnchorScroll.current) {
            goToSection(i);
          }
        },
      });
    });
  }, [isTablet]);

  useEffect(() => {
    if (location.hash) {
      const section = document.getElementById(location.hash.slice(1));

      if (section) {
        isAnchorScroll.current = true;
        section.scrollIntoView({ behavior: "smooth" });
      }
      setTimeout(() => {
        isAnchorScroll.current = false;
      }, 500);
    }
  }, [location]);

  return (
    <>
      <Hero
        sectionRef={heroSectionRef}
        firstSectionRef={heroFirstSectionRef}
        secondSectionRef={heroSecondSectionRef}
      />
      <Mission sectionRef={missionSectionRef} />
      <Priorities sectionRef={prioritiesSectionRef} />
      <Vision sectionRef={visionSectionRef} />
    </>
  );
};
