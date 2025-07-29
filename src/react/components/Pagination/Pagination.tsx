import cl from "classnames";

import styles from "./Pagination.module.scss";

interface PaginationProps {
  handleSelectSlide: (index: number) => void;
  totalSlides: number;
  activeSlide: number;
}

export const Pagination = ({
  totalSlides,
  activeSlide,
  handleSelectSlide,
}: PaginationProps) => {
  return (
    <ul className={styles.pagination}>
      {Array.from({ length: totalSlides }, (_, index) => (
        <li key={index}>
          <button
            type="button"
            onClick={() => handleSelectSlide(index)}
            className={cl(styles.paginationDot, {
              [styles.paginationDotActive]: activeSlide === index,
            })}
          />
        </li>
      ))}
    </ul>
  );
};
