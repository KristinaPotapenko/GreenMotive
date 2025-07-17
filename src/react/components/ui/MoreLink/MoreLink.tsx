import type React from "react";
import { Link } from "react-router-dom";

import styles from "./MoreLink.module.scss";

interface MoreLinkProps {
  path: string;
  children: React.ReactNode;
}

export const MoreLink = ({ path, children }: MoreLinkProps) => {
  return (
    <Link to={path} className={styles.link}>
      {children}
    </Link>
  );
};
