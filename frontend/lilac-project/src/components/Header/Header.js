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

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">Lilac Studio</Link>
        {/* <img
          className={styles.logoImg}
          src="/images/logo.png"
          alt="Lilac Studio Logo"
        /> */}
      </div>
      <nav>
        <ul className={styles["nav-links"]}>
          <li
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="/team-introduction">팀소개</Link>
            {isDropdownOpen && <DropdownMenu />}
          </li>
          <li
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="#">새소식</Link>
            {isDropdownOpen && <DropdownMenu />}
          </li>
          <li
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="/game-info">게임정보</Link>
            {isDropdownOpen && <DropdownMenu />}
          </li>
          <li
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="/community">커뮤니티</Link>
            {isDropdownOpen && <DropdownMenu />}
          </li>
          <li
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="/media">미디어</Link>
            {isDropdownOpen && <DropdownMenu />}
          </li>
          <li
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="/webshop">웹샵</Link>
            {isDropdownOpen && <DropdownMenu />}
          </li>
          <li
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="/customer-service">고객센터</Link>
            {isDropdownOpen && <DropdownMenu />}
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
