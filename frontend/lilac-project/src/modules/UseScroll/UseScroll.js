import { useState, useEffect } from "react";

export const ScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const UseScrollToTop = () => {
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 130) {
      setScrollButtonVisible(true);
    } else {
      setScrollButtonVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollButtonVisible, ScrollToTop };
};

export const HandlePageChange = (setCurrentPage, ScrollToTop) => (newPage) => {
  setCurrentPage(newPage);
  ScrollToTop();
};
