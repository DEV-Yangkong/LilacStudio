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

  // 각 드롭다운 메뉴에 해당하는 아이템 배열 정의
  const teamIntroductionItems = ["팀소개"];
  const newsItems = ["공지사항", "업데이트", "이벤트"];
  const gameInfoItems = ["개발중인 게임", "출시된 게임"];
  const communityItems = ["공략", "자유", "갤러리", "팬아트"];
  const mediaItems = ["유튜브"];
  const webshopItems = ["캐시아이템", "경매장"];
  const customerServiceItems = [
    "버그제보",
    "FAQ",
    "신고",
    "고객센터",
    "건의사항",
  ];

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">Lilac Studio</Link>
      </div>
      <nav>
        <ul className={styles["nav-links"]}>
          <li
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="/team-introduction">팀소개</Link>
            {isDropdownOpen && <DropdownMenu items={teamIntroductionItems} />}
          </li>
          <li
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="#">새소식</Link>
            {isDropdownOpen && <DropdownMenu items={newsItems} />}
          </li>
          <li
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="/game-info">게임정보</Link>
            {isDropdownOpen && <DropdownMenu items={gameInfoItems} />}
          </li>
          <li
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="/community">커뮤니티</Link>
            {isDropdownOpen && <DropdownMenu items={communityItems} />}
          </li>
          <li
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="/media">미디어</Link>
            {isDropdownOpen && <DropdownMenu items={mediaItems} />}
          </li>
          <li
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="/webshop">웹샵</Link>
            {isDropdownOpen && <DropdownMenu items={webshopItems} />}
          </li>
          <li
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="/customer-service">고객센터</Link>
            {isDropdownOpen && <DropdownMenu items={customerServiceItems} />}
          </li>
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
