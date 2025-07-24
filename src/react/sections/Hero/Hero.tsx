import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import cl from "classnames";

import { useWindowWidth } from "../../../scripts/hooks/useWindowWidth";

import { Tag } from "../../components/Tag/Tag";
import { MoreLink } from "../../components/ui/MoreLink/MoreLink";
import { DecorativeHeartIcon } from "../../components/DecorativeHeartIcon/DecorativeHeartIcon";
import { SliderNavigation } from "../../components/ui/SliderNavigation/SliderNavigation";

import styles from "./Hero.module.scss";

import mountBg from "./images/mount-bg.png";
import solarPanelBg from "./images/solar-panel-bg.png";
import plantBg from "./images/plant-bg.png";

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

export const Hero = () => {
  const windowWidth = useWindowWidth();
  const isTablet = windowWidth <= 1023;

  const [activeSlide, setActiveSlide] = useState(0);

  const sectionRef = useRef(null);
  const firstContainerRef = useRef(null);
  const secondContainerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const bgRef = useRef(null);

  const handleSlideChange = (index: number) => {
    if (index === activeSlide) return;

    gsap.to(descriptionRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setActiveSlide(index);
        gsap.set(descriptionRef.current, { x: 50, opacity: 0 });
        gsap.to(descriptionRef.current, { x: 0, opacity: 1, duration: 0.5 });
      },
    });

    gsap.to(bgRef.current, {
      y: 80,
      x: 40,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setActiveSlide(index);
        gsap.set(bgRef.current, { y: 80, x: 40, opacity: 0 });
        gsap.to(bgRef.current, {
          x: 0,
          y: 0,
          opacity: 1,
          delay: 0.2,
          duration: 0.5,
        });
      },
    });
  };

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
            trigger: firstContainerRef.current,
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
  }, []);

  useEffect(() => {
    if (!bgRef.current || !sectionRef?.current) return;

    gsap.fromTo(
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
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !descriptionRef.current) return;

    if (isTablet) {
      gsap.fromTo(
        descriptionRef.current,
        {
          y: 0,
          opacity: 1,
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "75% center",
            end: "+=300",
            scrub: true,
          },
          y: -100,
          opacity: 0,
          ease: "power2.out",
        }
      );

      return;
    }

    gsap.fromTo(
      descriptionRef.current,
      {
        y: 0,
        opacity: 1,
      },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "90% center",
          end: "+=300",
          scrub: true,
        },
        y: -100,
        opacity: 0,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cl("section", { container: !isTablet }, styles.hero)}
    >
      <div
        ref={firstContainerRef}
        className={cl("section", "container", styles.heroDesktop)}
      >
        <div className={styles.heroInner}>
          <Tag
            section={isTablet ? firstContainerRef : sectionRef}
            label="Project Green"
            theme="Green"
          />
          <h1 ref={titleRef} className={styles.heroTitle}>
            Empowering sustainable progress
          </h1>
          <div className={styles.heroWrapper}>
            <DecorativeHeartIcon
              section={isTablet ? firstContainerRef : sectionRef}
            />
            <MoreLink
              section={isTablet ? firstContainerRef : sectionRef}
              path="/"
            >
              Find Out More
            </MoreLink>
          </div>
        </div>
      </div>

      <div
        ref={secondContainerRef}
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
