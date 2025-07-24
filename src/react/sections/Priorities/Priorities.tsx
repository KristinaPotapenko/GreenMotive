import { useEffect, useRef } from "react";
import cl from "classnames";

import gsap from "gsap";

import { prioritiesInfo } from "./prioritiesInfo";

import { PrioritiesCard } from "../../components/card/PrioritiesCard/PrioritiesCard";

import styles from "./Priorities.module.scss";

export const Priorities = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current || !sectionRef.current) return;

    gsap.fromTo(
      titleRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "-20% center",
          end: "center center",
          scrub: true,
        },
        y: 0,
        opacity: 1,
      }
    );
  }, []);

  useEffect(() => {
    if (!titleRef.current || !listRef.current || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
    tl.to(titleRef.current, {
      y: -60,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    });

    tl.to(
      listRef.current,
      {
        y: -100,
        duration: 1.5,
        ease: "power2.out",
      },
      "-=0.2"
    );
  }, []);

  useEffect(() => {
    if (!bgRef.current || !sectionRef.current) return;

    gsap.fromTo(
      bgRef.current,
      {
        y: 80,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "60% center",
          scrub: true,
        },
        y: 0,
        opacity: 1,
      }
    );
  }, []);

  useEffect(() => {
    if (!listRef.current || !sectionRef.current) return;

    gsap.fromTo(
      listRef.current,
      {
        y: 80,
        rotateX: 15,
        transformOrigin: "top center",
      },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          scrub: true,
        },
        y: 0,
        rotateX: 0,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cl("section", "container", styles.priorities)}
    >
      <div ref={bgRef} className={styles.prioritiesBg}></div>
      <h2 ref={titleRef} className={styles.prioritiesTitle}>
        GreenMotive
      </h2>
      <ul ref={listRef} className={styles.prioritiesList}>
        {prioritiesInfo.map((priorityItem) => {
          return (
            <PrioritiesCard
              key={priorityItem.id}
              tagLabel={priorityItem.tagLabel}
              tagTheme="White"
              icon={priorityItem.icon}
              title={priorityItem.title}
              section={sectionRef}
            />
          );
        })}
      </ul>
    </section>
  );
};
