import cl from "classnames";

import { Input } from "../../inputs/Input/Input";
import { Logo } from "../../Logo/Logo";

import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={cl("container", styles.footer)}>
      <Logo />
      <form className={styles.footerForm}>
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
