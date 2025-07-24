import { useEffect, useRef } from "react";
import cl from "classnames";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MoreLink } from "../../components/ui/MoreLink/MoreLink";

import styles from "./Vision.module.scss";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const Vision = () => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

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
      {
        y: 80,
        opacity: 0.5,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      }
    );

    tl.fromTo(
      titleRef.current,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      },
      "-=1"
    );
  });

  useEffect(() => {
    if (!descriptionRef.current) return;

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
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.06,
      }
    );
  }, []);

  useEffect(() => {
    if (!wrapperRef.current || !sectionRef.current) return;

    const anim = gsap.fromTo(
      wrapperRef.current,
      {
        y: 0,
        opacity: 1,
      },
      {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        paused: true,
      }
    );

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "bottom bottom",
      end: "top center",
      onUpdate: (self) => {
        if (self.direction === -1) {
          anim.play();
        } else {
          anim.reverse();
        }
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cl("section", "container", styles.vision)}
    >
      <div>
        <video
          ref={videoRef}
          className={styles.visionVideo}
          src="https://videos.pexels.com/video-files/4205697/4205697-uhd_2560_1440_30fps.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <div className={styles.visionInfo}>
        <div ref={wrapperRef} className={styles.visionWrapper}>
          <p ref={descriptionRef} className={styles.visionDescription}>
            Developing groundbreaking technologies for a greener future.
          </p>
          <MoreLink path="/" section={sectionRef}>
            Find Out More
          </MoreLink>
        </div>
        <h2 ref={titleRef} className={styles.visionTitle}>
          Nature
        </h2>
      </div>
    </section>
  );
};
