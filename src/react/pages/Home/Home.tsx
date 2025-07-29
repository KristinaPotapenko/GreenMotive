import { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useScrollSnapNavigation } from "../../../scripts/hooks/useScrollSnapNavigation";
import { useWindowWidth } from "../../../scripts/hooks/useWindowWidth";

import { Hero } from "../../sections/Hero/Hero";
import { Mission } from "../../sections/Mission/Mission";
import { Priorities } from "../../sections/Priorities/Priorities";
import { Vision } from "../../sections/Vision/Vision";

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

  const sectionRefs = useMemo(() => {
    return isTablet
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
  }, [isTablet]);

  useScrollSnapNavigation(sectionRefs, isTablet, isAnchorScroll);

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

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
