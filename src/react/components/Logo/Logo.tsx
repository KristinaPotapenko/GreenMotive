import { Link } from "react-router-dom";

import { scrollToTop } from "../../../scripts/helpers/scrollToTop";

import styles from "./Logo.module.scss";

export const Logo = () => {
  return (
    <Link className={styles.logo} to="/" onClick={scrollToTop}>
      <svg className={styles.logoIcon}>
        <use
          xlinkHref={`${import.meta.env.BASE_URL}assets/icons/sprite.svg#logo`}
        />
      </svg>
      <p className={styles.logoText}>GreenMotive</p>
    </Link>
  );
};
