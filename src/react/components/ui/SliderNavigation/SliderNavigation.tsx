import cl from "classnames";

import styles from "./SliderNavigation.module.scss";

export const SliderNavigation = () => {
  return (
    <ul className={styles.navigation}>
      <li className={cl(styles.navigationItem, styles.navigationItemActive)}>
        01
      </li>
      <li className={styles.navigationItem}>02</li>
      <li className={styles.navigationItem}>03</li>
    </ul>
  );
};
