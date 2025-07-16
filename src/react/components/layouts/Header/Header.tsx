import cl from "classnames";

import { Logo } from "../../Logo/Logo";
import { Navigation } from "./Navigation/Navigation";
import { NavigationLink } from "../../ui/NavigationLink/NavigationLink";

import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={cl(styles.header, "container")}>
      <Logo />
      <Navigation />
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
    </header>
  );
};
