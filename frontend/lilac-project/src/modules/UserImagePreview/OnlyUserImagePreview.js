// OnlyUserImagePreview.js

import React from "react";
import styles from "./UserImagePreview.module.css";

const OnlyUserImagePreview = ({ userImageUrl }) => {
  return (
    <div className={styles["form-group"]}>
      <label>이미지 미리보기</label>
      <img
        src={userImageUrl}
        alt=""
        className={styles.thumbnail}
        style={{ maxWidth: "100%", maxHeight: "200px" }}
      />
    </div>
  );
};

export default OnlyUserImagePreview;
