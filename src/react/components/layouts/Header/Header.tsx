import cl from "classnames";

import { Logo } from "../../Logo/Logo";
import { Navigation } from "./Navigation/Navigation";
import { NavigationLink } from "../../ui/NavigationLink/NavigationLink";

import styles from "./Header.module.scss";
import { useWindowWidth } from "../../../../scripts/hooks/useWindowWidth";

export const Header = () => {
  const windowWidth = useWindowWidth();
  const isTablet = windowWidth <= 1023;

  return (
    <header className={cl(styles.header, "container")}>
      {!isTablet && <Logo />}
      <Navigation />
      {!isTablet && (
        <NavigationLink path="/">
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
