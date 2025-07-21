import { useEffect, useRef } from "react";
import gsap from "gsap";
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

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        delay: 0.2,
        duration: 1.5,
      }
    );
    gsap.fromTo(
      descriptionRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        delay: 0.2,
        duration: 1.5,
      }
    );
    gsap.fromTo(
      bgRef.current,
      {
        opacity: 0,
        y: 80,
        x: 40,
        filter: "blur(2px)",
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        filter: "blur(0px)",
        delay: 0.2,
        duration: 1.5,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section className={cl("section", { container: !isTablet }, styles.hero)}>
      <div className={cl("section", "container", styles.heroDesktop)}>
        <div className={styles.heroInner}>
          <Tag label="Project Green" theme="Green" />
          <h1 ref={titleRef} className={styles.heroTitle}>
            Empowering sustainable progress
          </h1>
          <div className={styles.heroWrapper}>
            <DecorativeHeartIcon />
            <MoreLink path="/">Find Out More</MoreLink>
          </div>
        </div>
      </div>

      <div className={cl("section", "container", styles.heroDesktop)}>
        <div className={cl(styles.heroWrapper, styles.heroSlider)}>
          <p ref={descriptionRef} className={styles.heroDescription}>
            Our innovative green technologies pave the way for energy efficiency
          </p>
          <SliderNavigation />
        </div>
      </div>

      <div ref={bgRef} className={styles.heroBg}></div>
    </section>
  );
};
