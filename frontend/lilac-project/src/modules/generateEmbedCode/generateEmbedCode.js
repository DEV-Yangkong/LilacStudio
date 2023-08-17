import React from "react";
import styles from "./generateEmbedCode.module.css";

const generateEmbedCode = (videoUrl, selectedPost, setVideoError) => {
  try {
    const videoId = videoUrl.split("v=")[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return (
      <iframe
        className={styles["video-frame"]}
        src={embedUrl}
        title={selectedPost.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    );
  } catch (error) {
    // 비디오 URL 파싱 오류 시 모달 표시
    setVideoError(true);
    return null;
  }
};

export default generateEmbedCode;
