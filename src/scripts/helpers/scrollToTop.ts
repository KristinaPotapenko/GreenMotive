import type React from "react";

import smoothscroll from "smoothscroll-polyfill";

export const scrollToTop = (e: React.MouseEvent) => {
  e.preventDefault();
  smoothscroll.polyfill();

  window.scrollTo({ top: 0, behavior: "smooth" });
};
