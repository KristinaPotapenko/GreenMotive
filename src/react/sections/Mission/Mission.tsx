import { useEffect, useRef, type RefObject } from "react";
import cl from "classnames";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { animation } from "./animation";
import { useWindowWidth } from "../../../scripts/hooks/useWindowWidth";
import { iconHref } from "../../../utils/constance";

import { Tag } from "../../components/Tag/Tag";
import { NavigationLink } from "../../components/ui/NavigationLink/NavigationLink";

import styles from "./Mission.module.scss";

import windmillImage from "./images/windmills.jpg";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

interface MissionProps {
  sectionRef: RefObject<HTMLElement | null>;
}

export const Mission = ({ sectionRef }: MissionProps) => {
  const windowWidth = useWindowWidth();
  const isTablet = windowWidth <= 1023;

  const tagsRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    animation(tagsRef, sectionRef.current, isTablet);
  }, [isTablet]);

  useEffect(() => {
    if (!wrapperRef.current || !sectionRef.current) return;

    if (isTablet) return;

    gsap.fromTo(
      wrapperRef.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        delay: 0.2,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "-10% center",
          toggleActions: "play none none reset",
        },
      }
    );
  }, [isTablet]);

  useEffect(() => {
    if (!imageRef.current || !sectionRef.current) return;

    if (isTablet) {
      gsap.fromTo(
        imageRef.current,
        {
          y: 0,
          opacity: 1,
        },
        {
          y: -80,
          opacity: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center center",
            end: "bottom top-=50px",
            scrub: true,
          },
        }
      );

      return;
    }

    gsap.fromTo(
      imageRef.current,
      {
        y: 0,
        opacity: 1,
      },
      {
        y: -160,
        opacity: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom top-=50px",
          scrub: true,
        },
      }
    );
  }, [isTablet]);

  useEffect(() => {
    if (!descriptionRef.current || !sectionRef.current) return;

    gsap.fromTo(
      descriptionRef.current,
      {
        y: 0,
        opacity: 1,
      },
      {
        y: -100,
        opacity: 0.4,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom top-=50px",
          scrub: true,
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    const splitInstance = new SplitText(titleRef.current, {
      type: "lines,words",
      linesClass: "line",
    });

    gsap.fromTo(
      splitInstance.lines,
      {
        y: 30,
        autoAlpha: 0,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          scrub: true,
        },
        y: 0,
        opacity: 1,
        autoAlpha: 1,
        stagger: 0.1,
        delay: 0.2,
        duration: 1.5,
        ease: "power3.out",
      }
    );

    return () => {
      splitInstance.revert();
    };
  }, [isTablet]);

  return (
    <section
      id="mission"
      ref={sectionRef}
      className={cl("section", "container", styles.mission)}
    >
      <div ref={tagsRef} className={styles.missionTags}>
        <Tag label="Technologies" theme="Green" />
        <Tag label="Solutions" theme="Dark" />
      </div>
      {!isTablet && (
        <h2 ref={titleRef} className={styles.missionTitle}>
          Our mission is to create a sustainable world by leading in green
          technology innovation. With a vision of reducing humanity`s impact on
          the planet, we work toward solutions that support a cleaner, more
          resilient future for all.
        </h2>
      )}
      {isTablet ? (
        <>
          <img
            className={styles.missionImage}
            src={windmillImage}
            alt="Windmills"
          />
          <p className={styles.missionDescription}>
            Our innovative green technologies pave the way for energy
            efficiency, resource conservation, and environmental restoration.
          </p>
          <NavigationLink section={sectionRef} path="/">
            <svg>
              <use xlinkHref={`${iconHref}lightning`} />
            </svg>
            Renewable Energy Solutions
          </NavigationLink>
        </>
      ) : (
        <div className={styles.missionWrapper}>
          <img
            className={styles.missionImage}
            src={windmillImage}
            alt="Windmills"
          />
          <p className={styles.missionDescription}>
            Our innovative green technologies pave the way for energy
            efficiency, resource conservation, and environmental restoration.
          </p>
        </div>
      )}
    </section>
  );
};
