import { useEffect, useRef } from "react";
import type React from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import styles from "./MoreLink.module.scss";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

    gsap.fromTo(
      linkRef.current,
      {
        opacity: 0,
        y: -40,
      },
      {
        scrollTrigger: {
          trigger: section.current,
          start: "40% center",
          toggleActions: "restart none none none",
        },
        opacity: 1,
        y: 0,
        delay: 0.2,
        duration: 1.5,
      }
    );
  }, []);

  return (
    <Link ref={linkRef} to={path} className={styles.link}>
      {children}
    </Link>
  );
};
