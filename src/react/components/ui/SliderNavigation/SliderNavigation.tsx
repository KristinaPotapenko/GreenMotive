import React, { useEffect } from "react";
import gsap from "gsap";
import cl from "classnames";

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
    if (!section) return;

    const items = gsap.utils.toArray<HTMLElement>("[data-item]");

    if (isTablet) {
      gsap.fromTo(
        items,
        { y: 0, opacity: 1 },
        {
          scrollTrigger: {
            trigger: section.current,
            start: "80% center",
            end: "+=300px",
            scrub: true,
          },
          opacity: 0,
          y: -60,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );

      return;
    }

    gsap.fromTo(
      items,
      { y: 0, opacity: 1 },
      {
        scrollTrigger: {
          trigger: section.current,
          start: "90% center",
          end: "+=300px",
          scrub: true,
        },
        opacity: 0,
        y: -60,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <ul className={styles.navigation}>
      <li
        className={cl(styles.navigationItem, {
          [styles.navigationItemActive]: activeSlide === 0,
        })}
        data-item
        onClick={() => onChangeSlide(0)}
      >
        01
      </li>
      <li
        className={cl(styles.navigationItem, {
          [styles.navigationItemActive]: activeSlide === 1,
        })}
        data-item
        onClick={() => onChangeSlide(1)}
      >
        02
      </li>
      <li
        className={cl(styles.navigationItem, {
          [styles.navigationItemActive]: activeSlide === 2,
        })}
        data-item
        onClick={() => onChangeSlide(2)}
      >
        03
      </li>
    </ul>
  );
};
