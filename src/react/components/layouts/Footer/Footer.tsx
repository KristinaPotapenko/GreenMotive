import { useEffect, useRef } from "react";
import cl from "classnames";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Input } from "../../inputs/Input/Input";
import { Logo } from "../../Logo/Logo";

import styles from "./Footer.module.scss";

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current || !footerRef.current) return;

    gsap.fromTo(
      formRef.current,
      {
        y: 20,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "-30 bottom",
          end: "bottom bottom",
          scrub: true,
        },
        y: 0,
        opacity: 1,
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className={cl("container", styles.footer)}>
      <Logo section={footerRef} />
      <form ref={formRef} className={styles.footerForm}>
        <Input
          id="email"
          type="email"
          name="email"
          pattern=".+@example\.com"
          placeholder="Enter your Email"
        />
        <button className={styles.footerButton}>Request</button>
      </form>
    </footer>
  );
};
