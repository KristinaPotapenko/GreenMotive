import cl from "classnames";

import styles from "./Pagination.module.scss";

export const Pagination = () => {
  return (
    <ul className={styles.pagination}>
      <li className={cl(styles.paginationDot, styles.paginationDotActive)}></li>
      <li className={styles.paginationDot}></li>
      <li className={styles.paginationDot}></li>
    </ul>
  );
};
