import cl from "classnames";

import { prioritiesInfo } from "./prioritiesInfo";

import { PrioritiesCard } from "../../components/card/PrioritiesCard/PrioritiesCard";

import styles from "./Priorities.module.scss";

export const Priorities = () => {
  return (
    <section className={cl("section", "container", styles.priorities)}>
      <div className={styles.prioritiesBg}></div>
      <h2 className={styles.prioritiesTitle}>GreenMotive</h2>
      <ul className={styles.prioritiesList}>
        {prioritiesInfo.map((priorityItem) => {
          return (
            <PrioritiesCard
              key={priorityItem.id}
              tagLabel={priorityItem.tagLabel}
              tagTheme="White"
              icon={priorityItem.icon}
              title={priorityItem.title}
            />
          );
        })}
      </ul>
    </section>
  );
};
