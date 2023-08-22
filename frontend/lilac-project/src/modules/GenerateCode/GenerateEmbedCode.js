// GenerateEmbedCode.js

import React from "react";
import Styles from "./GenerateEmbedCode.module.css";

const GenerateEmbedCode = (videoUrl, selectedPost) => {
  try {
    const VideoId = videoUrl.split("v=")[1];
    const EmbedUrl = `https://www.youtube.com/embed/${VideoId}`;
    return (
      <iframe
        className={Styles["video-frame"]}
        src={EmbedUrl}
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

export default GenerateEmbedCode;
