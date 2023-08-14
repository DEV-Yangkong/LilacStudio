import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./NoticeBoard.module.css";

const NoticeBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [noticePosts, setNoticePosts] = useState([]);

  const postsPerPage = 6; // 페이지당 게시글 수

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "백엔드 API 주소" // 백엔드에서 게시글 데이터를 받아오는 API 주소
        );
        setNoticePosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
  const postsToShow = filteredPosts.slice(startIndex, endIndex);

  const formatDate = (dateString) => {
    // 날짜 포맷팅 함수 구현
  };

  return (
    <div className={styles["noticeBoard"]}>
      <h1>공지사항</h1>
      <div className={styles["search-bar"]}>{/* 검색창 코드 추가 */}</div>
      {filteredPosts.length === 0 && searchTerm !== "" ? (
        <div className={styles["no-results"]}>검색 결과가 없습니다.</div>
      ) : (
        <div className={styles["post-list"]}>
          {/* 게시글 목록 매핑하여 표시 */}
        </div>
      )}
      {/* 페이지 네비게이션 추가 */}
      <div className={styles["write-button-container"]}>
        <Link
          to="/news/notice-board/write-post-nb"
          className={styles["write-button"]}
        >
          글쓰기
        </Link>
      </div>
    </div>
  );
};

export default NoticeBoard;
