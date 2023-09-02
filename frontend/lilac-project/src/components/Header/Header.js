import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleDropdownEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    setIsDropdownOpen(false);
  };

  const menuItems = [
    {
      label: "팀소개",
      path: "/team-introduction",
      items: ["팀소개"],
      itemPaths: ["/team-introduction/team-introduction"],
    },
    {
      label: "새소식",
      path: "/news",
      items: ["공지사항", "업데이트", "이벤트"],
      itemPaths: [
        "/news/notice-board",
        "/news/update-board",
        "/news/event-board",
      ],
    },
    {
      label: "게임정보",
      path: "/game-info",
      items: ["개발중인 게임", "출시된 게임", "게임 매칭 테스트"],
      itemPaths: [
        "/game-info/developing",
        "/game-info/released",
        "/game-info/my-game-match",
      ],
    },
    {
      label: "커뮤니티",
      path: "/community",
      items: ["자유게시판", "공략", "팬아트"],
      itemPaths: [
        "/community/free-board",
        "/community/guide-board",

        "/community/fan-art",
      ],
    },
    {
      label: "미디어",
      path: "/media",
      items: ["유튜브", "갤러리"],
      itemPaths: ["/media/youtube", "/media/gallery-board"],
    },
    {
      label: "웹샵",
      path: "/web-shop",
      items: ["캐시아이템", "경매장"],
      itemPaths: ["/web-shop/cash-items", "/web-shop/auction"],
    },
    {
      label: "고객센터",
      path: "/customer-service",
      items: ["버그제보", "FAQ", "신고", "고객센터", "건의사항"],
      itemPaths: [
        "/customer-service/bug-reports",
        "/customer-service/faq",
        "/customer-service/reports",
        "/customer-service/contact",
        "/customer-service/suggestions",
      ],
    },
  ];

  return (
    <header
      className={styles.header}
      onMouseEnter={handleDropdownEnter}
      onMouseLeave={handleDropdownLeave}
    >
      <div className={styles.logo}>
        <Link to="/">Lilac Studio</Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles["nav-links"]}>
          {menuItems.map((menuItem, index) => (
            <li key={index}>
              <Link to={menuItem.path}>{menuItem.label}</Link>
              <div
                className={`${styles.dropdownMenu} ${
                  isDropdownOpen ? styles.open : ""
                }`}
              >
                <ul>
                  {menuItem.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link to={menuItem.itemPaths[itemIndex]}>{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.auth}>
        <button onClick={() => navigate("/login")}>로그인</button>
      </div>
    </header>
  );
};

export default Header;
