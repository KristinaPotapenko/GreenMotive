import { Link } from "react-router-dom";
import cl from "classnames";

import { useWindowWidth } from "../../../../../scripts/hooks/useWindowWidth";
import { iconHref } from "../../../../../utils/constance";

import { Logo } from "../../../Logo/Logo";

import styles from "../Header.module.scss";

export const Navigation = () => {
  const windowWidth = useWindowWidth();
  const isTablet = windowWidth <= 1023;

  return (
    <ul className={styles.headerList}>
      <li className={cl(styles.headerItem, styles.headerItemActive)}>
        <button type="button">
          <svg>
            <use xlinkHref={`${iconHref}menu`} />
          </svg>
          Menu
        </button>
        <nav></nav>
      </li>
      <li className={styles.headerItem}>
        {isTablet ? (
          <Logo />
        ) : (
          <Link className={styles.headerLink} to="/#priorities">
            Discover Innovation
          </Link>
        )}
      </li>
    </ul>
  );
};
