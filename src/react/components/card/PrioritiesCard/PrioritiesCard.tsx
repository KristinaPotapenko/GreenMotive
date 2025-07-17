import cl from "classnames";

import { Tag, type TagTheme } from "../../Tag/Tag";

import styles from "./PrioritiesCard.module.scss";

interface PrioritiesCardProps {
  tagLabel: string;
  tagTheme: TagTheme;
  icon: string;
  title: string;
}

export const PrioritiesCard = ({
  tagLabel,
  tagTheme,
  icon,
  title,
}: PrioritiesCardProps) => {
  return (
    <li className={styles.card}>
      <Tag label={tagLabel} theme={tagTheme} />
      <svg
        className={cl(styles.cardIcon, {
          [styles.cardIconRotate]: icon === "development",
        })}
      >
        <use
          xlinkHref={`${
            import.meta.env.BASE_URL
          }assets/icons/sprite.svg#${icon}`}
        />
      </svg>
      <h2 className={styles.cardTitle}>{title}</h2>
    </li>
  );
};
