import React, { useEffect } from "react";
import cl from "classnames";

import gsap from "gsap";

import { useWindowWidth } from "../../../../scripts/hooks/useWindowWidth";

import styles from "./SliderNavigation.module.scss";

interface SliderNavigationProps {
  section?: React.RefObject<HTMLElement | null>;
  activeSlide: number;
  onChangeSlide: (index: number) => void;
}

export const SliderNavigation = ({
  section,
  activeSlide,
  onChangeSlide,
}: SliderNavigationProps) => {
  const windowWidth = useWindowWidth();
  const isTablet = windowWidth <= 1023;

  useEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>("[data-item]");

    gsap.fromTo(
      items,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  useEffect(() => {
    if (!section?.current) return;

    const items = gsap.utils.toArray<HTMLElement>("[data-item]");

    const triggerConfig = {
      trigger: section.current,
      start: isTablet ? "80% center" : "90% center",
      end: "+=300px",
      scrub: true,
    };

    const animation = gsap.fromTo(
      items,
      { y: 0, opacity: 1 },
      {
        scrollTrigger: triggerConfig,
        opacity: 0,
        y: -60,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
    };
  }, [section, isTablet]);

  return (
    <ul className={styles.navigation}>
      {Array.from({ length: 3 }, (_, index) => (
        <li
          key={index}
          className={cl(styles.navigationItem, {
            [styles.navigationItemActive]: activeSlide === index,
          })}
          data-item
          onClick={() => onChangeSlide(index)}
        >
          {`0${index + 1}`}
        </li>
      ))}
    </ul>
  );
};
