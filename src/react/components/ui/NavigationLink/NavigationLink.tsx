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
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = linkRef.current;

    if (!section) return;
    if (!link || !section?.current) return;

    const animation = gsap.fromTo(
      link,
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

    return () => {
      animation.scrollTrigger?.kill();
    };
  }, [section]);

  return (
    <Link ref={linkRef} to={path} className={styles.button}>
      {children}
    </Link>
  );
};
