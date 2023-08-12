import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

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
      itemPaths: ["/team-introduction"],
    },
    {
      label: "새소식",
      path: "/news",
      items: ["공지사항", "업데이트", "이벤트"],
      itemPaths: ["/news/notice", "/news/update", "/news/event"],
    },
    {
      label: "게임정보",
      path: "/game-info",
      items: ["개발중인 게임", "출시된 게임"],
      itemPaths: ["/game-info/developing", "/game-info/released"],
    },
    {
      label: "커뮤니티",
      path: "/community",
      items: ["공략", "자유", "갤러리", "팬아트"],
      itemPaths: [
        "/community/guide",
        "/community/free",
        "/community/gallery",
        "/community/fan-art",
      ],
    },
    {
      label: "미디어",
      path: "/media",
      items: ["유튜브"],
      itemPaths: ["/media/youtube"],
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
        "/customer-service/bug-report",
        "/customer-service/faq",
        "/customer-service/report",
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
      <nav>
        <ul className={styles["nav-links"]}>
          {menuItems.map((menuItem, index) => (
            <li key={index}>
              <Link to={menuItem.path}>{menuItem.label}</Link>
              {isDropdownOpen && (
                <DropdownMenu
                  items={menuItem.items}
                  onItemClick={(item) => console.log(`Clicked: ${item}`)} // 아이템을 클릭했을 때 수행할 동작을 정의
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.auth}>
        <button onClick={() => navigate("/login")}>로그인</button>{" "}
        {/* 로그인 버튼 클릭 시 /login 경로로 이동 */}
      </div>
    </header>
  );
};

export default Header;
