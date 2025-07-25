import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { scrollToTop } from "../../../scripts/helpers/scrollToTop";

import styles from "./Logo.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface LogoProps {
  section?: React.RefObject<HTMLElement | null>;
}

export const Logo = ({ section }: LogoProps) => {
  const logoRef = useRef(null);
  const logoIconRef = useRef(null);

  useEffect(() => {
    gsap.to(logoIconRef.current, {
      opacity: 0.5,
      rotate: 180,
      delay: 0.2,
      duration: 2,
    });
  }, []);

  useEffect(() => {
    if (!section?.current) return;

    gsap.fromTo(
      logoRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: section.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
        y: 0,
        opacity: 1,
        delay: 0.2,
        duration: 1.5,
      }
    );
  }, []);

  return (
    <Link
      ref={logoRef}
      className={styles.logo}
      to="/#header"
      onClick={scrollToTop}
    >
      <svg ref={logoIconRef} className={styles.logoIcon}>
        <use
          xlinkHref={`${import.meta.env.BASE_URL}assets/icons/sprite.svg#logo`}
        />
      </svg>
      <p className={styles.logoText}>GreenMotive</p>
    </Link>
  );
};
