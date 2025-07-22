import cl from "classnames";

import styles from "./Tag.module.scss";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export type TagTheme = "Green" | "Dark" | "White";

interface TagProps {
  label: string;
  theme: TagTheme;
}

export const Tag = ({ label, theme }: TagProps) => {
  const tagRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      tagRef.current,
      {
        opacity: 0,
        y: 40,
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
    <p ref={tagRef} className={cl(styles.tag, styles[`tag${theme}`])}>
      {label}
    </p>
  );
};
