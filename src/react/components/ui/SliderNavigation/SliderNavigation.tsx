import { useEffect } from "react";
import gsap from "gsap";
import cl from "classnames";

import styles from "./SliderNavigation.module.scss";

export const SliderNavigation = () => {
  useEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>("[data-item]");
    gsap.fromTo(
      items,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <ul className={styles.navigation}>
      <li
        className={cl(styles.navigationItem, styles.navigationItemActive)}
        data-item
      >
        01
      </li>
      <li className={styles.navigationItem} data-item>
        02
      </li>
      <li className={styles.navigationItem} data-item>
        03
      </li>
    </ul>
  );
};
