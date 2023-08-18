import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./NoticeBoard.module.css";
import "font-awesome/css/font-awesome.min.css";
import formatDate from "../../../modules/formatDate/formatDate";

const NoticeBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [noticePosts, setNoticePosts] = useState([]);

  const postsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/notice_board/"
        );
        setNoticePosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 130) {
        setScrollButtonVisible(true);
      } else {
        setScrollButtonVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filteredPosts = noticePosts.filter(
    (post) =>
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPageCount = Math.ceil(filteredPosts.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, filteredPosts.length);
  const reversedFilteredPosts = [...filteredPosts].reverse();
  const postsToShow = reversedFilteredPosts.slice(startIndex, endIndex);

  return (
    <div className={styles["notice-board"]}>
      <h1>공지사항</h1>
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
      {searchTerm && (
        <div className={styles["search-result"]}>
          <p>검색 결과: "{searchTerm}"</p>
        </div>
      )}
      {filteredPosts.length === 0 && searchTerm !== "" ? (
        <div className={styles["no-results"]}>검색 결과가 없습니다.</div>
      ) : (
        <div className={styles["post-list"]}>
          {postsToShow.map((post) => (
            <div className={styles["post-item"]} key={post.id}>
              <Link
                to={`/news/notice-board/notice-board-detail/${post.id}`}
                className={styles["post-title-link"]}
              >
                <div className={styles["post-title"]}>{post.title}</div>
              </Link>
              <div className={styles["post-info"]}>
                <span className={styles["post-date"]}>
                  {formatDate(post.created_at)}
                </span>
                <span className={styles["post-views"]}>
                  조회수 {post.views_count}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {scrollButtonVisible && (
        <button className={styles["top-button"]} onClick={scrollToTop}>
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
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}
      <div className={styles["write-button-container"]}>
        <Link
          to="/news/notice-board/write-post-nb"
          className={styles["write-button"]}
        >
          UPLOAD
        </Link>
      </div>
    </div>
  );
};

export default NoticeBoard;