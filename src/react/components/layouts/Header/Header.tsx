import { useEffect, useRef } from "react";
import cl from "classnames";

import { iconHref } from "../../../../utils/constance";
import { useWindowWidth } from "../../../../scripts/hooks/useWindowWidth";
import { animation } from "./animation";

import { Logo } from "../../Logo/Logo";
import { Navigation } from "./Navigation/Navigation";
import { NavigationLink } from "../../ui/NavigationLink/NavigationLink";

import styles from "./Header.module.scss";

export const Header = () => {
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (headerRef.current) {
      animation(headerRef);
    }
  }, []);

  const windowWidth = useWindowWidth();
  const isTablet = windowWidth <= 1023;

  return (
    <header
      id="header"
      ref={headerRef}
      className={cl(styles.header, "container")}
    >
      {!isTablet && <Logo section={headerRef} />}
      <Navigation section={headerRef} />
      {!isTablet && (
        <NavigationLink path="/#vision">
          <svg>
            <use xlinkHref={`${iconHref}lightning`} />
          </svg>
          Renewable Energy Solutions
        </NavigationLink>
      )}
    </header>
  );
};
