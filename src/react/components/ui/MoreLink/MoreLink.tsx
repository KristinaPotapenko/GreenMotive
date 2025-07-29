import { useEffect, useRef } from "react";
import type React from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./MoreLink.module.scss";

interface MoreLinkProps {
  path?: string;
  section?: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}

gsap.registerPlugin(ScrollTrigger);

export const MoreLink = ({
  path = "/#mission",
  section,
  children,
}: MoreLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = linkRef.current;

    if (!link) return;

    gsap.fromTo(
      link,
      {
        opacity: 0,
        y: -40,
      },
      {
        opacity: 1,
        y: 0,
        delay: 0.2,
        duration: 1.5,
      }
    );

    if (!section?.current) return;
    const isHero = section.current.className.includes("hero");

    if (!isHero) {
      gsap.fromTo(
        link,
        {
          opacity: 0,
          y: -40,
        },
        {
          scrollTrigger: {
            trigger: section.current,
            start: "50% center",
            toggleActions: "restart none none none",
          },
          opacity: 1,
          y: 0,
          delay: 0.2,
          duration: 1.5,
        }
      );
    }

    if (isHero) {
      gsap.fromTo(
        link,
        {
          y: 0,
          opacity: 1,
        },
        {
          scrollTrigger: {
            trigger: section.current,
            start: "70% center",
            end: "bottom center",
            scrub: true,
          },
          y: -60,
          opacity: 0,
        }
      );
    }
  }, [section]);

  return (
    <Link ref={linkRef} to={path} className={styles.link}>
      {children}
    </Link>
  );
};
