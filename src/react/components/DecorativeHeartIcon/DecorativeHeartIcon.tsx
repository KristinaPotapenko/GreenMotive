import { useEffect, useRef } from "react";
import gsap from "gsap";

import styles from "./DecorativeHeartIcon.module.scss";

export const DecorativeHeartIcon = () => {
  const borderRef = useRef(null);

  useEffect(() => {
    if (!borderRef.current) return;

    gsap.fromTo(
      borderRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        delay: 0.2,
        duration: 1.5,
        ease: "power2.out",
        transformOrigin: "bottom",
      }
    );
  }, []);

  return (
    <div className={styles.wrapper}>
      <div ref={borderRef} className={styles.border}></div>
      <svg className={styles.icon}>
        <use
          xlinkHref={`${import.meta.env.BASE_URL}assets/icons/sprite.svg#heart`}
        />
      </svg>
    </div>
  );
};
