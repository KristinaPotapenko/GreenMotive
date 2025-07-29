import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cl from "classnames";

import { useWindowWidth } from "../../../../../scripts/hooks/useWindowWidth";
import { iconHref } from "../../../../../utils/constance";

import { Logo } from "../../../Logo/Logo";

import styles from "../Header.module.scss";
import stylesNav from "./Navigation.module.scss";

interface NavigationProps {
  section?: React.RefObject<HTMLElement | null>;
}

export const Navigation = ({ section }: NavigationProps) => {
  const windowWidth = useWindowWidth();
  const isTablet = windowWidth <= 1023;

  const navRef = useRef<HTMLUListElement | null>(null);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <ul className={styles.headerList}>
      <li className={cl(styles.headerItem, styles.headerItemActive)}>
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <svg>
            <use xlinkHref={`${iconHref}menu`} />
          </svg>
          Menu
        </button>
        {isOpen && (
          <nav
            ref={navRef}
            className={cl(stylesNav.navigation, { [stylesNav.active]: isOpen })}
          >
            <ul className={stylesNav.navigationList}>
              <li
                className={stylesNav.navigationItem}
                onClick={() => {
                  setIsOpen(false);
                  navigate("/#home");
                }}
              >
                Home
              </li>
              <li
                className={stylesNav.navigationItem}
                onClick={() => {
                  setIsOpen(false);
                  navigate("/#mission");
                }}
              >
                Mission
              </li>
              <li
                className={stylesNav.navigationItem}
                onClick={() => {
                  setIsOpen(false);
                  navigate("/#priorities");
                }}
              >
                Priorities
              </li>
              <li
                className={stylesNav.navigationItem}
                onClick={() => {
                  setIsOpen(false);
                  navigate("/#vision");
                }}
              >
                Vision
              </li>
            </ul>
          </nav>
        )}
      </li>
      <li className={styles.headerItem}>
        {isTablet ? (
          <Logo section={section} />
        ) : (
          <Link className={styles.headerLink} to="/#priorities">
            Discover Innovation
          </Link>
        )}
      </li>
    </ul>
  );
};
