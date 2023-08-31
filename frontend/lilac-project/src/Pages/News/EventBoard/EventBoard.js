import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./EventBoard.module.css";
import "font-awesome/css/font-awesome.min.css";
import FormatDate from "../../../modules/FormatDate/FormatDate";
import {
  ScrollToTop,
  HandlePageChange,
  UseScrollToTop,
} from "../../../modules/HandleFunction/HandleScroll";

const EventBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [EventPosts, setEventPosts] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const postsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/event_board/"
        );
        setEventPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setCurrentDate(new Date());
  }, []);

  // 상단으로 이동
  const { scrollButtonVisible } = UseScrollToTop();

  // 검색 기능
  const filteredPosts = EventPosts.filter(
    (post) =>
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 페이지 네이션
  const totalPageCount = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, filteredPosts.length);
  const postsToShow = filteredPosts.slice(startIndex, endIndex);

  //이벤트기간과 디데이 계산
  const calculateDday = (startDate, endDate) => {
    const now = new Date(); // 현재 날짜와 시간 가져오기
    console.log("post.start_date:", startDate);
    console.log("post.end_date:", endDate);
    const startTargetDate = new Date(startDate);
    const endTargetDate = new Date(endDate);

    if (now < startTargetDate) {
      return <div className={styles["upcoming"]}>이벤트 준비중</div>;
    } else if (now >= startTargetDate && now <= endTargetDate) {
      const timeDiffToEnd = endTargetDate.getTime() - now.getTime();
      const dDay = Math.floor(timeDiffToEnd / (1000 * 60 * 60 * 24));

      if (dDay === 0) {
        return <div className={styles["progress"]}>진행중</div>;
      } else {
        return (
          <div className={styles["progress"]}>
            D-{dDay} <br /> <span>진행중</span>
          </div>
        );
      }
    } else {
      return <div className={styles["completed"]}>이벤트 종료</div>;
    }
  };

  return (
    <div className={styles["event-board"]}>
      <h1>이벤트</h1>
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
          to="/news/event-board/write-post-eb"
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
                to={`/news/event-board/event/${post.id}`}
                className={styles["post-title-link"]}
              >
                <div className={styles["post-image-container"]}>
                  <img
                    src={post.image_url}
                    alt="Post"
                    className={styles["post-image"]}
                  />
                </div>
                <div className={styles["post-title"]}>{post.title}</div>
              </Link>
              <div className={styles["post-info"]}>
                <span className={styles["post-date"]}>
                  시작일: {FormatDate(post.start_date)}
                </span>
                <span className={styles["post-date"]}>
                  종료일: {FormatDate(post.end_date)}
                </span>
              </div>
              <div className={styles["post-d-day"]}>
                {calculateDday(post.start_date, post.end_date)}
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

export default EventBoard;
