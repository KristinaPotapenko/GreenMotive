import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import { scrollToTop } from "../../../scripts/helpers/scrollToTop";

import styles from "./Logo.module.scss";

export const Logo = () => {
  const logoIconRef = useRef(null);

  useEffect(() => {
    gsap.to(logoIconRef.current, {
      opacity: 0.5,
      rotate: 180,
      delay: 0.2,
      duration: 2,
    });
  }, []);

  return (
    <Link className={styles.logo} to="/" onClick={scrollToTop}>
      <svg ref={logoIconRef} className={styles.logoIcon}>
        <use
          xlinkHref={`${import.meta.env.BASE_URL}assets/icons/sprite.svg#logo`}
        />
      </svg>
      <p className={styles.logoText}>GreenMotive</p>
    </Link>
  );
};
