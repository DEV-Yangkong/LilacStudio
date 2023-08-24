import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./UpdateBoard.module.css";
import "font-awesome/css/font-awesome.min.css";
import FormatDate from "../../../modules/FormatDate/FormatDate";
import {
  ScrollToTop,
  HandlePageChange,
  UseScrollToTop,
} from "../../../modules/HandleFunction/HandleScroll";

const UpdateBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [UpdatePosts, setUpdatePosts] = useState([]);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const postsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/update_board/"
        );
        setUpdatePosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const { scrollButtonVisible } = UseScrollToTop();

  const filteredPosts = UpdatePosts.filter(
    (post) =>
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPostsByYearAndMonth = filteredPosts.filter((post) => {
    const postDate = new Date(post.created_at);
    return (
      (currentYear === "all" || postDate.getFullYear() === currentYear) &&
      postDate.getMonth() + 1 === currentMonth
    );
  });

  const toggleYearDropdown = () => {
    setIsYearDropdownOpen(!isYearDropdownOpen);
  };

  const closeYearDropdown = () => {
    setIsYearDropdownOpen(false);
  };

  const availableYears = Array.from({ length: 4 }, (_, i) => 2023 - i); // 2020부터 2023까지의 연도 배열 생성

  const totalPageCount = Math.ceil(filteredPosts.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, filteredPosts.length);
  const postsToShow = filteredPosts.slice(startIndex, endIndex);

  const handleYearChange = (year) => {
    setCurrentYear(year);
  };

  const handleMonthChange = (month) => {
    setCurrentMonth(month);
  };

  // 월별로 해당 월에 포스트가 있는지 여부를 저장하는 배열
  const monthsWithPosts = Array.from({ length: 12 }, (_, i) =>
    filteredPosts.some(
      (post) => new Date(post.created_at).getMonth() + 1 === i + 1
    )
  );

  return (
    <div className={styles["update-board"]}>
      <h1>업데이트</h1>
      <div className={styles["search-bar"]}>
        <input
          type="text"
          placeholder="제목 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className={styles["search-icon"]}>
          <i className="fa fa-search"></i>
        </span>
      </div>
      <div className={styles["write-button-container"]}>
        <Link
          to="/news/update-board/write-post-ub"
          className={styles["write-button"]}
        >
          UPLOAD
        </Link>
      </div>
      <div
        className={`${styles["year-month-selector"]} ${styles["year-month-separator"]}`}
      >
        <span className={styles["current-year"]}>{currentYear}</span>
        <div className={styles["year-dropdown-container"]}>
          <button
            className={styles["year-dropdown-button"]}
            onClick={toggleYearDropdown}
          >
            <i className="fa fa-chevron-down"></i>
          </button>
          {isYearDropdownOpen && (
            <div
              className={styles["year-dropdown-list"]}
              onBlur={closeYearDropdown}
            >
              <div className={styles["year-dropdown-scroll"]} tabIndex={0}>
                {availableYears.map((year) => (
                  <div
                    key={year}
                    className={styles["year-option"]}
                    onClick={() => handleYearChange(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles["month-buttons-container"]}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
            const hasPostsInMonth = monthsWithPosts[month - 1];
            const isActive = currentMonth === month;

            return (
              <button
                key={month}
                className={`${styles["month-button"]} ${
                  hasPostsInMonth && isActive ? styles["active"] : ""
                }`}
                onClick={() => handleMonthChange(month)}
                style={isActive ? { color: "#9f86c0" } : null}
              >
                {month}월
                {hasPostsInMonth && (
                  <span
                    className={`${styles["month-indicator"]} ${
                      isActive ? styles["visible"] : ""
                    }`}
                  ></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div
        className={`${styles["calendar-content"]} ${styles["post-list-separator"]}`}
      >
        {/* 연도와 월에 따른 포스트 내용을 보여주는 부분 */}
        {filteredPostsByYearAndMonth.length === 0 ? (
          <div className={styles["no-results"]}>
            <img src="/images/warning.png" alt="warning_img" />
            <span>해당 게시글이 없습니다.</span>
          </div>
        ) : (
          <div className={styles["post-list"]}>
            {filteredPostsByYearAndMonth.map((post) => (
              <Link
                to={`/news/update-board/update/${post.id}`}
                className={styles["post-item"]}
                key={post.id}
              >
                <div className={styles["post-content-layout"]}>
                  <div
                    className={`${styles["post-date"]} ${styles["larger-font"]}`}
                  >
                    {FormatDate(post.created_at)}
                  </div>
                  <div className={styles["post-image-container"]}>
                    <img
                      src={post.image_url}
                      alt="Post"
                      className={styles["post-image"]}
                    />
                  </div>
                  <div
                    className={`${styles["post-title"]} ${
                      post.title.length > 10 ? styles["long-title"] : ""
                    }`}
                  >
                    {post.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      {searchTerm && (
        <div className={styles["search-result"]}>
          <p>검색 결과: "{searchTerm}"</p>
        </div>
      )}
      {filteredPosts.length === 0 && searchTerm !== "" && (
        <div className={styles["no-results"]}>검색 결과가 없습니다.</div>
      )}
      {scrollButtonVisible && (
        <button className={styles["top-button"]} onClick={ScrollToTop}>
          TOP
        </button>
      )}
      {totalPageCount > 1 && (
        <div className={styles["page-navigation"]}>
          {Array.from({ length: totalPageCount }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                className={page === currentPage ? styles["active"] : ""}
                onClick={() =>
                  HandlePageChange(setCurrentPage, ScrollToTop)(page)
                }
              >
                {page}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateBoard;
