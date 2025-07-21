import type React from "react";
import { Link } from "react-router-dom";

import styles from "./MoreLink.module.scss";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MoreLinkProps {
  path: string;
  children: React.ReactNode;
}

export const MoreLink = ({ path, children }: MoreLinkProps) => {
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

  return (
    <Link ref={linkRef} to={path} className={styles.link}>
      {children}
    </Link>
  );
};
