import React, { useEffect, useRef, type RefObject } from "react";
import cl from "classnames";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Tag, type TagTheme } from "../../Tag/Tag";

import styles from "./PrioritiesCard.module.scss";
import { iconHref } from "../../../../utils/constance";

interface PrioritiesCardProps {
  cardRef?: React.RefObject<HTMLLIElement | null>;
  tagLabel: string;
  tagTheme: TagTheme;
  icon: string;
  title: string;
  section?: React.RefObject<HTMLElement | null>;
}

gsap.registerPlugin(ScrollTrigger);

export const PrioritiesCard = ({
  cardRef,
  tagLabel,
  tagTheme,
  icon,
  title,
  section,
}: PrioritiesCardProps) => {
  const iconRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!iconRef.current || !section || !section?.current) return;

    const animation = gsap.fromTo(
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

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [section]);

  return (
    <li ref={cardRef} className={styles.card}>
      <Tag label={tagLabel} theme={tagTheme} />
      <svg
        className={cl(styles.cardIcon, {
          [styles.cardIconRotate]: icon === "development",
        })}
        ref={iconRef}
      >
        <use xlinkHref={`${iconHref}${icon}`} />
      </svg>
      <h2 className={styles.cardTitle}>{title}</h2>
    </li>
  );
};
