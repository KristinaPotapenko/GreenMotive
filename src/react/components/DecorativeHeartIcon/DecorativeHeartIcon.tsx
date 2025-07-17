import styles from "./DecorativeHeartIcon.module.scss";

export const DecorativeHeartIcon = () => {
  return (
    <div className={styles.wrapper}>
      <svg className={styles.icon}>
        <use
          xlinkHref={`${import.meta.env.BASE_URL}assets/icons/sprite.svg#heart`}
        />
      </svg>
    </div>
  );
};
