import { useEffect, type RefObject } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animation = (
  sectionRef: RefObject<HTMLElement>,
  videoRef: RefObject<HTMLVideoElement>,
  titleRef: RefObject<HTMLHeadingElement>,
  descriptionRef: RefObject<HTMLParagraphElement>,
  wrapperRef: RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    if (!sectionRef.current || !videoRef.current || !titleRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    tl.fromTo(
      videoRef.current,
      { y: 80, opacity: 0.5 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" }
    );
    tl.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
      "-=1"
    );
  }, []);

  useEffect(() => {
    if (!descriptionRef.current || !sectionRef.current) return;

    const splitInstance = SplitText.create(descriptionRef.current, {
      type: "words",
      aria: "hidden",
    });

    gsap.fromTo(
      splitInstance.words,
      { y: 20, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "40% center",
          toggleActions: "restart none none none",
        },
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.06,
      }
    );

    return () => splitInstance.revert();
  }, []);

  useEffect(() => {
    if (!wrapperRef.current || !sectionRef.current) return;

    const anim = gsap.fromTo(
      wrapperRef.current,
      { y: 0, opacity: 1 },
      { y: 60, opacity: 0, duration: 1, ease: "power4.out", paused: true }
    );

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "bottom bottom",
      end: "top center",
      onUpdate: (self) => {
        self.direction === -1 ? anim.play() : anim.reverse();
      },
    });
  }, []);
};
