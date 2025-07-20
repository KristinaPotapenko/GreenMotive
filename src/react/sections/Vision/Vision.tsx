import cl from "classnames";

import { MoreLink } from "../../components/ui/MoreLink/MoreLink";

import styles from "./Vision.module.scss";

export const Vision = () => {
  return (
    <section className={cl("section", "container", styles.vision)}>
      <div>
        <video
          className={styles.visionVideo}
          src="https://videos.pexels.com/video-files/4205697/4205697-uhd_2560_1440_30fps.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <div className={styles.visionInfo}>
        <div className={styles.visionWrapper}>
          <p className={styles.visionDescription}>
            Developing groundbreaking technologies for a greener future.
          </p>
          <MoreLink path="/">Find Out More</MoreLink>
        </div>
        <h2 className={styles.visionTitle}>Nature</h2>
      </div>
    </section>
  );
};
