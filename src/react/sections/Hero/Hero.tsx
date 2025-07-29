import { useEffect, useRef, useState, type RefObject } from "react";
import cl from "classnames";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { useWindowWidth } from "../../../scripts/hooks/useWindowWidth";
import { animation } from "./animation";

import { Tag } from "../../components/Tag/Tag";
import { MoreLink } from "../../components/ui/MoreLink/MoreLink";
import { DecorativeHeartIcon } from "../../components/DecorativeHeartIcon/DecorativeHeartIcon";
import { SliderNavigation } from "../../components/ui/SliderNavigation/SliderNavigation";

import styles from "./Hero.module.scss";

import mountBg from "./images/mount-bg.png";
import solarPanelBg from "./images/solar-panel-bg.png";
import plantBg from "./images/plant-bg.png";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const slider = [
  {
    id: 1,
    description:
      "Our innovative green technologies pave the way for energy efficiency",
    image: mountBg,
  },
  {
    id: 2,
    description:
      "Developing advanced solar, wind, and hydro solutions for a carbon-free future.",
    image: solarPanelBg,
  },
  {
    id: 3,
    description:
      "Empowering communities through sustainable practices and green infrastructure.",
    image: plantBg,
  },
];

interface HeroProps {
  sectionRef: RefObject<HTMLElement | null>;
  firstSectionRef: RefObject<HTMLDivElement | null>;
  secondSectionRef: RefObject<HTMLDivElement | null>;
}

export const Hero = ({
  sectionRef,
  firstSectionRef,
  secondSectionRef,
}: HeroProps) => {
  const windowWidth = useWindowWidth();
  const isTablet = windowWidth <= 1023;

  const [activeSlide, setActiveSlide] = useState(0);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const bgRef = useRef(null);

  const handleSlideChange = (index: number) => {
    if (index === activeSlide) return;

    setActiveSlide(index);

    const tl = gsap.timeline();

    tl.to(descriptionRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.5,
    })
      .set(descriptionRef.current, { x: 50, opacity: 0 })
      .to(descriptionRef.current, { x: 0, opacity: 1, duration: 0.5 }, "<0.1");

    tl.to(bgRef.current, {
      y: 80,
      x: 40,
      opacity: 0,
      duration: 0.5,
    })
      .set(bgRef.current, { y: 80, x: 40, opacity: 0 })
      .to(
        bgRef.current,
        {
          x: 0,
          y: 0,
          opacity: 1,
          delay: 0.2,
          duration: 0.5,
        },
        "<0.1"
      );
  };

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.5 }
    )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5 },
        "-=1"
      )
      .fromTo(
        bgRef.current,
        { opacity: 0, y: 80, x: 40, filter: "blur(2px)" },
        {
          opacity: 1,
          y: 0,
          x: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
        },
        "-=1"
      );
  }, []);

  useEffect(() => {
    if (!titleRef.current || !sectionRef?.current) return;

    if (isTablet) {
      gsap.fromTo(
        titleRef.current,
        {
          y: 0,
          opacity: 1,
        },
        {
          scrollTrigger: {
            trigger: firstSectionRef.current,
            start: "40% center",
            end: "bottom 70%",
            scrub: true,
          },
          y: -40,
          opacity: 0,
        }
      );

      return;
    }

    gsap.fromTo(
      titleRef.current,
      {
        y: 0,
        opacity: 1,
      },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom center",
          scrub: true,
        },
        y: -40,
        opacity: 0,
      }
    );
  }, [isTablet]);

  useEffect(() => {
    if (!bgRef.current || !sectionRef?.current) return;

    const animation = gsap.fromTo(
      bgRef.current,
      {
        opacity: 1,
      },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "70% center",
          end: "bottom center",
          scrub: true,
        },
        opacity: 0.4,
        delay: 0.2,
        duration: 1.5,
      }
    );

    return () => animation.scrollTrigger?.kill();
  }, []);

  useEffect(() => {
    if (sectionRef.current && descriptionRef.current) {
      animation({
        target: descriptionRef.current,
        trigger: sectionRef.current,
        config: {
          start: isTablet ? "75% center" : "90% center",
        },
      });
    }
  }, [isTablet]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className={cl("section", { container: !isTablet }, styles.hero)}
    >
      <div
        ref={firstSectionRef}
        className={cl("section", "container", styles.heroDesktop)}
      >
        <div className={styles.heroInner}>
          <Tag
            section={isTablet ? firstSectionRef : sectionRef}
            label="Project Green"
            theme="Green"
          />
          <h1 ref={titleRef} className={styles.heroTitle}>
            Empowering sustainable progress
          </h1>
          <div className={styles.heroWrapper}>
            <DecorativeHeartIcon
              section={isTablet ? firstSectionRef : sectionRef}
            />
            <MoreLink section={isTablet ? firstSectionRef : sectionRef}>
              Find Out More
            </MoreLink>
          </div>
        </div>
      </div>

      <div
        ref={secondSectionRef}
        className={cl("section", "container", styles.heroDesktop)}
      >
        <div className={cl(styles.heroWrapper, styles.heroSlider)}>
          <p ref={descriptionRef} className={styles.heroDescription}>
            {slider[activeSlide].description}
          </p>
          <SliderNavigation
            activeSlide={activeSlide}
            onChangeSlide={handleSlideChange}
            section={sectionRef}
          />
        </div>
      </div>

      <div
        ref={bgRef}
        className={styles.heroBg}
        style={{ backgroundImage: `url(${slider[activeSlide].image})` }}
      ></div>
    </section>
  );
};
