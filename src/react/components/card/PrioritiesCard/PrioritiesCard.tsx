import React, { useEffect, useRef } from "react";
import cl from "classnames";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Tag, type TagTheme } from "../../Tag/Tag";

import styles from "./PrioritiesCard.module.scss";

interface PrioritiesCardProps {
  tagLabel: string;
  tagTheme: TagTheme;
  icon: string;
  title: string;
  section?: React.RefObject<HTMLElement | null>;
}

gsap.registerPlugin(ScrollTrigger);

export const PrioritiesCard = ({
  tagLabel,
  tagTheme,
  icon,
  title,
  section,
}: PrioritiesCardProps) => {
  const iconRef = useRef(null);

  useEffect(() => {
    if (!iconRef.current || !section) return;

    gsap.fromTo(
      iconRef.current,
      {
        rotate: 45,
        opacity: 0.4,
      },
      {
        scrollTrigger: {
          trigger: section.current,
          start: "top center",
          end: "60% center",
          scrub: true,
        },
        rotate: 0,
        opacity: 1,
      }
    );
  }, [section]);

  return (
    <li className={styles.card}>
      <Tag label={tagLabel} theme={tagTheme} />
      <svg
        className={cl(styles.cardIcon, {
          [styles.cardIconRotate]: icon === "development",
        })}
        ref={iconRef}
      >
        <use
          xlinkHref={`${
            import.meta.env.BASE_URL
          }assets/icons/sprite.svg#${icon}`}
        />
      </svg>
      <h2 className={styles.cardTitle}>{title}</h2>
    </li>
  );
};
