import { useRef, type RefObject } from "react";
import cl from "classnames";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MoreLink } from "../../components/ui/MoreLink/MoreLink";

import styles from "./Vision.module.scss";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface VisionProps {
  sectionRef: RefObject<HTMLElement | null>;
}

export const Vision = ({ sectionRef }: VisionProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  return (
    <section
      id="vision"
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
          <MoreLink section={sectionRef}>Find Out More</MoreLink>
        </div>
        <h2 ref={titleRef} className={styles.visionTitle}>
          Nature
        </h2>
      </div>
    </section>
  );
};
