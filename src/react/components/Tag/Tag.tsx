import React, { useEffect, useRef } from "react";
import cl from "classnames";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./Tag.module.scss";

gsap.registerPlugin(ScrollTrigger);

export type TagTheme = "Green" | "Dark" | "White";

interface TagProps {
  label: string;
  theme: TagTheme;
  section?: React.RefObject<HTMLElement | null>;
}

export const Tag = ({ label, theme, section }: TagProps) => {
  const tagRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!tagRef.current) return;

    gsap.fromTo(
      tagRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        delay: 0.2,
        duration: 1.5,
      }
    );
  }, []);

  useEffect(() => {
    if (!tagRef.current || !section?.current) return;

    gsap.fromTo(
      tagRef.current,
      {
        y: 0,
        opacity: 1,
      },
      {
        y: -40,
        opacity: 0,
        scrollTrigger: {
          trigger: section.current,
          start: "center center",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  }, [section]);

  return (
    <p ref={tagRef} className={cl(styles.tag, styles[`tag${theme}`])}>
      {label}
    </p>
  );
};
