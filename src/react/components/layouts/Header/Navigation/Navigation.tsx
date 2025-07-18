import { Link } from "react-router-dom";
import cl from "classnames";

import styles from "../Header.module.scss";
import { useWindowWidth } from "../../../../../scripts/hooks/useWindowWidth";
import { Logo } from "../../../Logo/Logo";

export const Navigation = () => {
  const windowWidth = useWindowWidth();
  const isTablet = windowWidth <= 1023;

  return (
    <ul className={styles.headerList}>
      <li className={cl(styles.headerItem, styles.headerItemActive)}>
        <button>
          <svg>
            <use
              xlinkHref={`${
                import.meta.env.BASE_URL
              }assets/icons/sprite.svg#menu`}
            />
          </svg>
          Menu
        </button>
        <nav></nav>
      </li>
      <li className={styles.headerItem}>
        {isTablet ? (
          <Logo />
        ) : (
          <Link className={styles.headerLink} to="/">
            Discover Innovation
          </Link>
        )}
      </li>
    </ul>
  );
};
