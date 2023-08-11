import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    setIsDropdownOpen(false);
  };

  const menuItems = [
    { label: "팀소개", items: ["팀소개"] },
    { label: "새소식", items: ["공지사항", "업데이트", "이벤트"] },
    { label: "게임정보", items: ["개발중인 게임", "출시된 게임"] },
    { label: "커뮤니티", items: ["공략", "자유", "갤러리", "팬아트"] },
    { label: "미디어", items: ["유튜브"] },
    { label: "웹샵", items: ["캐시아이템", "경매장"] },
    {
      label: "고객센터",
      items: ["버그제보", "FAQ", "신고", "고객센터", "건의사항"],
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">Lilac Studio</Link>
      </div>
      <nav>
        <ul className={styles["nav-links"]}>
          {menuItems.map((menuItem, index) => (
            <li
              key={index}
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <Link to="#">{menuItem.label}</Link>
              {isDropdownOpen && <DropdownMenu items={menuItem.items} />}
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.auth}>
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </header>
  );
};

export default Header;
