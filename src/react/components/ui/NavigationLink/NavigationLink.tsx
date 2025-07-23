import type React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./NavigationLink.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface NavigationLinkProps {
  path: string;
  section?: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}

export const NavigationLink = ({
  path,
  section,
  children,
}: NavigationLinkProps) => {
  const linkRef = useRef(null);

  useEffect(() => {
    if (!section) return;
    if (!linkRef.current || !section.current) return;

    gsap.fromTo(
      linkRef.current,
      {
        y: 0,
        opacity: 1,
      },
      {
        scrollTrigger: {
          trigger: section.current,
          start: "60% center",
          scrub: true,
        },
        y: -100,
        opacity: 0,
      }
    );
  }, []);

  return (
    <Link ref={linkRef} to={path} className={styles.button}>
      {children}
    </Link>
  );
};
