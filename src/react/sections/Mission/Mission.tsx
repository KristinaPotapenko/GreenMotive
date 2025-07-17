import cl from "classnames";

import { Tag } from "../../components/Tag/Tag";

import windmillImage from "./images/windmills.jpg";

import styles from "./Mission.module.scss";

export const Mission = () => {
  return (
    <section className={cl("section", "container", styles.mission)}>
      <div className={styles.missionTags}>
        <Tag label="Technologies" theme="Green" />
        <Tag label="Solutions" theme="Dark" />
      </div>
      <h2 className={styles.missionTitle}>
        Our mission is to create a sustainable world by leading in green
        technology innovation. With a vision of reducing humanity`s impact on
        the planet, we work toward solutions that support a cleaner, more
        resilient future for all.
      </h2>
      <div className={styles.missionWrapper}>
        <img
          className={styles.missionImage}
          src={windmillImage}
          alt="Windmills"
        />
        <p className={styles.missionDescription}>
          Our innovative green technologies pave the way for energy efficiency,
          resource conservation, and environmental restoration.
        </p>
      </div>
    </section>
  );
};
