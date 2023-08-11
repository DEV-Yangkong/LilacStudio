import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebar}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="검색..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <FaSearch />
          </button>
        </div>
        <div className={styles.links}>
          <h3>관련 게임</h3>
          <ul>
            <li>
              <a href="#">게임 1</a>
            </li>
            <li>
              <a href="#">게임 2</a>
            </li>
            <li>
              <a href="#">게임 3</a>
            </li>
          </ul>
        </div>
        <div className={styles.links}>
          <h3>이벤트</h3>
          <ul>
            <li>
              <a href="#">이벤트 1</a>
            </li>
            <li>
              <a href="#">이벤트 2</a>
            </li>
            <li>
              <a href="#">이벤트 3</a>
            </li>
          </ul>
        </div>
        <div className={styles.links}>
          <h3>블로그</h3>
          <ul>
            <li>
              <a href="#">블로그 글 1</a>
            </li>
            <li>
              <a href="#">블로그 글 2</a>
            </li>
            <li>
              <a href="#">블로그 글 3</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
