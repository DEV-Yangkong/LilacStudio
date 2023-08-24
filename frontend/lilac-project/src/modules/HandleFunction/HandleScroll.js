import { useState, useEffect } from "react";

export const ScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const UseScrollToTop = () => {
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);

  const RangeScroll = () => {
    if (window.pageYOffset > 160) {
      setScrollButtonVisible(true);
    } else {
      setScrollButtonVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", RangeScroll);
    return () => {
      window.removeEventListener("scroll", RangeScroll);
    };
  }, []);

  return { scrollButtonVisible, ScrollToTop };
};

export const HandlePageChange = (setCurrentPage, ScrollToTop) => (newPage) => {
  setCurrentPage(newPage);
  ScrollToTop();
};
