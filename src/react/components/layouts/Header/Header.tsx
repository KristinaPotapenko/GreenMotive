import { useEffect, useRef } from "react";
import cl from "classnames";

import { useWindowWidth } from "../../../../scripts/hooks/useWindowWidth";
import { animation } from "./animation";

import { Logo } from "../../Logo/Logo";
import { Navigation } from "./Navigation/Navigation";
import { NavigationLink } from "../../ui/NavigationLink/NavigationLink";

import styles from "./Header.module.scss";

export const Header = () => {
  const headerRef = useRef(null);

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
      <Navigation />
      {!isTablet && (
        <NavigationLink path="/#vision">
          <svg>
            <use
              xlinkHref={`${
                import.meta.env.BASE_URL
              }assets/icons/sprite.svg#lightning`}
            />
          </svg>
          Renewable Energy Solutions
        </NavigationLink>
      )}
    </header>
  );
};
