import type React from "react";
import { Link } from "react-router-dom";

import styles from "./NavigationLink.module.scss";

interface NavigationLinkProps {
  path: string;
  children: React.ReactNode;
}
export const NavigationLink = ({ path, children }: NavigationLinkProps) => {
  return (
    <Link to={path} className={styles.button}>
      {children}
    </Link>
  );
};
