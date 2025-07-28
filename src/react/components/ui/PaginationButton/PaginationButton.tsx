import cl from "classnames";

import styles from "./PaginationButton.module.scss";
import { iconHref } from "../../../../utils/constance";

interface PaginationButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  direction: "Left" | "Right";
  isActive: boolean;
  disabled: boolean;
}

export const PaginationButton = ({
  onClick,
  isActive,
  direction,
  disabled,
}: PaginationButtonProps) => {
  return (
    <button
      type="button"
      className={cl(styles.button, {
        [styles.buttonActive]: isActive,
        [styles.buttonLeft]: direction === "Left",
      })}
      onClick={onClick}
      disabled={disabled}
    >
      <svg className={styles.buttonIcon}>
        <use xlinkHref={`${iconHref}arrow`} />
      </svg>
    </button>
  );
};
