import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./NoticeList.module.css"; // CSS 모듈을 불러옵니다.

function NoticeList() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Axios로 백엔드 API 호출
    axios
      .get("/api/notices/") // 변경해야 할 API 경로를 입력
      .then((response) => {
        setNotices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
      });
  }, []);

  return (
    <div className={styles.noticeListContainer}>
      <h2>공지사항</h2>
      <ul>
        {notices.map((notice) => (
          <li key={notice.id} className={styles.noticeItem}>
            <span className={styles.noticeTitle}>{notice.title}</span>
            <span className={styles.noticeDate}>{notice.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoticeList;
