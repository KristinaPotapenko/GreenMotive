import cl from "classnames";

import styles from "./Tag.module.scss";

export type TagTheme = "Green" | "Dark" | "White";

interface TagProps {
  label: string;
  theme: TagTheme;
}

export const Tag = ({ label, theme }: TagProps) => {
  return <p className={cl(styles.tag, styles[`tag${theme}`])}>{label}</p>;
};
