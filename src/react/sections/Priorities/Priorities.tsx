import { useEffect, useRef, useState, type RefObject } from "react";
import cl from "classnames";

import gsap from "gsap";

import { animation } from "./animation";
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

  const bgRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  animation({ sectionRef, titleRef, listRef, bgRef });

  const slideRef = useRef<HTMLLIElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const [slideWidth, setSlideWidth] = useState(0);

  const totalSlides = listRef.current?.children.length ?? 0;
  const visibleSlides = isMobile ? 1 : isTablet ? 2 : 3;

  const isLastSlide = activeSlide >= totalSlides - visibleSlides;

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
      x: isMobile ? newOffset : newOffset - 24,
      overwrite: true,
    });

    setOffset(newOffset);
    setActiveSlide((prev) => prev + 1);
  };

  const handlePrevSlide = () => {
    if (!listRef.current || !slideWidth || offset === 0) return;

    const newOffset = offset + slideWidth;

    gsap.to(listRef.current, {
      x: isMobile ? newOffset : newOffset + 24,
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
            isActive={!isLastSlide}
            direction="Right"
            disabled={isLastSlide}
          />
        </div>
      )}
    </section>
  );
};
