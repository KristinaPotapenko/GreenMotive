import cl from "classnames";

import { useWindowWidth } from "../../../scripts/hooks/useWindowWidth";

import { Tag } from "../../components/Tag/Tag";
import { MoreLink } from "../../components/ui/MoreLink/MoreLink";
import { DecorativeHeartIcon } from "../../components/DecorativeHeartIcon/DecorativeHeartIcon";
import { SliderNavigation } from "../../components/ui/SliderNavigation/SliderNavigation";

import styles from "./Hero.module.scss";

export const Hero = () => {
  const windowWidth = useWindowWidth();
  const isTablet = windowWidth <= 1023;

  return (
    <section className={cl("section", { container: !isTablet }, styles.hero)}>
      <div className={cl("section", "container", styles.heroDesktop)}>
        <div className={styles.heroInner}>
          <Tag label="Project Green" theme="Green" />
          <h1 className={styles.heroTitle}>Empowering sustainable progress</h1>
          <div className={styles.heroWrapper}>
            <DecorativeHeartIcon />
            <MoreLink path="/">Find Out More</MoreLink>
          </div>
        </div>
      </div>

      <div className={cl("section", "container", styles.heroDesktop)}>
        <div className={cl(styles.heroWrapper, styles.heroSlider)}>
          <p className={styles.heroDescription}>
            Our innovative green technologies pave the way for energy efficiency
          </p>
          <SliderNavigation />
        </div>
      </div>

      <div className={styles.heroBg}></div>
    </section>
  );
};
