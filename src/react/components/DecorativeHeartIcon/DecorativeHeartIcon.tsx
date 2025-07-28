import { useEffect, useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { iconHref } from "../../../utils/constance";

import styles from "./DecorativeHeartIcon.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface DecorativeHeartIconProps {
  section: React.RefObject<HTMLElement | null>;
}

export const DecorativeHeartIcon = ({ section }: DecorativeHeartIconProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    if (!borderRef.current) return;

    gsap.fromTo(
      borderRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        delay: 0.2,
        duration: 1.5,
        ease: "power2.out",
        transformOrigin: "bottom",
      }
    );
  }, []);

  useLayoutEffect(() => {
    if (!borderRef.current || !iconRef.current || !section?.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "70% center",
        end: "bottom center",
        scrub: true,
      },
    });

    tl.to(borderRef.current, {
      y: -60,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    });

    tl.to(
      iconRef.current,
      {
        y: -60,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      },
      "-=1.1"
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [section]);

  useEffect(() => {
    if (!borderRef.current || !section.current) return;

    gsap.fromTo(
      iconRef.current,
      { y: 0, opacity: 1 },
      {
        scrollTrigger: {
          trigger: section.current,
          start: "70% center",
          end: "bottom center",
          scrub: true,
        },
        y: -60,
        opacity: 0,
        delay: 0.4,
        duration: 1.5,
        ease: "power2.out",
      }
    );
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const icon = iconRef.current;

    if (!wrapper || !icon) return;

    const handleMouseMove = (e: MouseEvent) => {
      const bounds = wrapper.getBoundingClientRect();
      const offsetX = e.clientX - bounds.left;
      const offsetY = e.clientY - bounds.top;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      const rotateX = -(offsetY - centerY) / 1.5;
      const rotateY = (offsetX - centerX) / 1.5;

      gsap.to(icon, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 600,
      });
    };

    const resetTilt = () => {
      gsap.to(icon, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", resetTilt);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", resetTilt);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={borderRef} className={styles.border}></div>
      <svg ref={iconRef} className={styles.icon}>
        <use xlinkHref={`${iconHref}heart`} />
      </svg>
    </div>
  );
};
