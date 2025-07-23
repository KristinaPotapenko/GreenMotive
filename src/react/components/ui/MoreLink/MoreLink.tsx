import { useEffect, useRef } from "react";
import type React from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./MoreLink.module.scss";

interface MoreLinkProps {
  path: string;
  section?: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}

gsap.registerPlugin(ScrollTrigger);

export const MoreLink = ({ path, section, children }: MoreLinkProps) => {
  const linkRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      linkRef.current,
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
  }, []);

  useEffect(() => {
    if (!section) return;
    if (!section.current) return;
    if (section.current.className.includes("hero")) return;

    gsap.fromTo(
      linkRef.current,
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
  }, []);

  useEffect(() => {
    if (!section) return;
    if (!section.current) return;
    if (!section.current.className.includes("hero")) return;

    gsap.fromTo(
      linkRef.current,
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
  }, []);

  return (
    <Link ref={linkRef} to={path} className={styles.link}>
      {children}
    </Link>
  );
};
