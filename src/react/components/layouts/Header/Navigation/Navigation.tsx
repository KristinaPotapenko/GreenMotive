import { Link } from "react-router-dom";
import cl from "classnames";

import styles from "../Header.module.scss";

export const Navigation = () => {
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
        <Link className={styles.headerLink} to="/">
          Discover Innovation
        </Link>
      </li>
    </ul>
  );
};
