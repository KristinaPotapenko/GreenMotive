import smoothscroll from "smoothscroll-polyfill";

export const scrollToTop = () => {
  smoothscroll.polyfill();

  window.scrollTo({ top: 0, behavior: "smooth" });
};
