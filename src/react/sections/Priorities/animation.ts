import gsap from "gsap";
import { useEffect, type RefObject } from "react";

export const animation = ({
  sectionRef,
  titleRef,
  listRef,
  bgRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  titleRef: RefObject<HTMLElement | null>;
  listRef: RefObject<HTMLUListElement | null>;
  bgRef: RefObject<HTMLDivElement | null>;
}) => {
  useEffect(() => {
    if (!titleRef.current || !sectionRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "-20% center",
          end: "center center",
          scrub: true,
        },
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
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "60% center",
          scrub: true,
        },
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
        y: 0,
        rotateX: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          scrub: true,
        },
      }
    );
  }, []);
};
