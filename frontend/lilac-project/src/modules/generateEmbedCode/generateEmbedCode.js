import React from "react";
import styles from "./generateEmbedCode.module.css";

// generateEmbedCode.js
const generateEmbedCode = (videoUrl, selectedPost) => {
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
    // 오류 발생 시 null 반환
    return null;
  }
};

export default generateEmbedCode;
