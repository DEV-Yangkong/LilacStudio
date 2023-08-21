// UserImagePreview.js

import React from "react";
import styles from "./UserImagePreview.module.css";

const UserImagePreview = ({ userImageType, userImageUrl, userImageFile }) => {
  return (
    <div className={styles["form-group"]}>
      <label>이미지 미리보기</label>
      {userImageType === "url" && userImageUrl && (
        <img
          src={userImageUrl}
          alt=""
          className={styles.thumbnail}
          style={{ maxWidth: "100%", maxHeight: "200px" }}
        />
      )}
      {userImageType === "file" && userImageFile && (
        <img
          src={URL.createObjectURL(userImageFile)}
          alt=""
          className={styles.thumbnail}
          style={{ maxWidth: "100%", maxHeight: "200px" }}
        />
      )}
    </div>
  );
};

export default UserImagePreview;
