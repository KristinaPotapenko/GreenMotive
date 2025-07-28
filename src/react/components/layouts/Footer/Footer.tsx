import { useLayoutEffect, useRef } from "react";
import cl from "classnames";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Input } from "../../inputs/Input/Input";
import { Logo } from "../../Logo/Logo";

import styles from "./Footer.module.scss";

gsap.registerPlugin(ScrollTrigger);

const emailInputProps = {
  id: "email",
  type: "email",
  name: "email",
  pattern: ".+@example\\.com",
  placeholder: "Enter your Email",
};

export const Footer = () => {
  const footerRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useLayoutEffect(() => {
    if (!footerRef.current || !formRef.current) return;

    const animation = gsap.fromTo(
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

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  return (
    <footer ref={footerRef} className={cl("container", styles.footer)}>
      <Logo section={footerRef} />
      <form ref={formRef} className={styles.footerForm}>
        <Input {...emailInputProps} />
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className={styles.footerButton}
        >
          Request
        </button>
      </form>
    </footer>
  );
};
