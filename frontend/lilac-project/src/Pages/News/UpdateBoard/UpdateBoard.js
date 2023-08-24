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
  const [UpdatePosts, setUpdatePosts] = useState([]);

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

  const totalPageCount = Math.ceil(filteredPosts.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, filteredPosts.length);
  const postsToShow = filteredPosts.slice(startIndex, endIndex);

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
                to={`/news/update-board/update/${post.id}`}
                className={styles["post-title-link"]}
              >
                <div className={styles["post-title"]}>{post.title}</div>
              </Link>
              <div className={styles["post-info"]}>
                <div className={styles["post-date-and-views"]}>
                  <span className={styles["post-date"]}>
                    {FormatDate(post.created_at)}
                  </span>
                  <span className={styles["post-views"]}>
                    조회수 {post.views_count}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
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
