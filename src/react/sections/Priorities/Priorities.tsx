import { useEffect, useRef, useState, type RefObject } from "react";
import cl from "classnames";

import gsap from "gsap";

import { useWindowWidth } from "../../../scripts/hooks/useWindowWidth";
import { prioritiesInfo } from "./prioritiesInfo";

import { PrioritiesCard } from "../../components/card/PrioritiesCard/PrioritiesCard";
import { PaginationButton } from "../../components/ui/PaginationButton/PaginationButton";
import { Pagination } from "../../components/Pagination/Pagination";

import styles from "./Priorities.module.scss";

interface PrioritiesProps {
  sectionRef: RefObject<HTMLElement | null>;
}

export const Priorities = ({ sectionRef }: PrioritiesProps) => {
  const windowWidth = useWindowWidth();
  const isTablet = windowWidth <= 1023;
  const isMobile = windowWidth <= 767;

  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef<HTMLUListElement>(null);

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

  const slideRef = useRef<HTMLLIElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const [slideWidth, setSlideWidth] = useState(0);

  const totalSlides = listRef.current?.children.length ?? 0;

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const updateSizes = () => {
      if (!slideRef.current || !listRef.current) return;

      const newSlideWidth = slideRef.current.clientWidth;
      const newOffset = 0;

      setSlideWidth(newSlideWidth);
      setOffset(newOffset);
      setActiveSlide(0);

      gsap.set(listRef.current, {
        x: newOffset,
      });
    };

    updateSizes();

    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  const handleNextSlide = () => {
    if (!listRef.current || !slideWidth) return;

    const newOffset = offset - slideWidth;

    gsap.to(listRef.current, {
      x: isTablet ? newOffset + 24 : newOffset,
      overwrite: true,
    });

    setOffset(newOffset);
    setActiveSlide((prev) => prev + 1);
  };

  const handlePrevSlide = () => {
    if (!listRef.current || !slideWidth || offset === 0) return;

    const newOffset = offset + slideWidth;

    gsap.to(listRef.current, {
      x: isTablet ? newOffset - 24 : newOffset,
      overwrite: true,
    });

    setOffset(newOffset);
    setActiveSlide((prev) => prev - 1);
  };

  const handleSelectSlide = (index: number) => {
    if (!listRef.current || !slideWidth) return;

    const newOffset = -index * slideWidth;

    gsap.to(listRef.current, {
      x: newOffset,
      overwrite: true,
    });

    setOffset(newOffset);

    setActiveSlide(index);
  };

  return (
    <section
      id="priorities"
      ref={sectionRef}
      className={cl("section", "container", styles.priorities)}
    >
      <div ref={bgRef} className={styles.prioritiesBg}></div>
      <h2 ref={titleRef} className={styles.prioritiesTitle}>
        GreenMotive
      </h2>
      <div className={styles.prioritiesSliderWrapper}>
        <ul ref={listRef} className={styles.prioritiesList}>
          {prioritiesInfo.map((priorityItem) => {
            return (
              <PrioritiesCard
                key={priorityItem.id}
                cardRef={slideRef}
                tagLabel={priorityItem.tagLabel}
                tagTheme="White"
                icon={priorityItem.icon}
                title={priorityItem.title}
                section={sectionRef}
              />
            );
          })}
        </ul>
      </div>
      {isTablet && (
        <Pagination
          key={activeSlide + "-" + slideWidth}
          totalSlides={isMobile ? totalSlides : Math.ceil(totalSlides / 2)}
          activeSlide={activeSlide}
          handleSelectSlide={handleSelectSlide}
        />
      )}
      {isTablet && (
        <div className={styles.prioritiesButton}>
          <PaginationButton
            onClick={handlePrevSlide}
            isActive={activeSlide === 0 ? false : true}
            direction="Left"
            disabled={activeSlide === 0}
          />
          <PaginationButton
            onClick={handleNextSlide}
            isActive={
              isMobile && activeSlide === totalSlides - 1
                ? false
                : isTablet && activeSlide === totalSlides - 2
                ? false
                : true
            }
            direction="Right"
            disabled={
              isMobile
                ? activeSlide === totalSlides - 1
                : activeSlide === totalSlides - 2
            }
          />
        </div>
      )}
    </section>
  );
};
