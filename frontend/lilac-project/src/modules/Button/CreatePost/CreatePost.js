// CreatePost/CreatePost.js
import React from "react";
import { SubmitButton, CancelPostButton } from "../ButtonComponents";
import styles from "../ButtonGroup.module.css";

const CreateModeButtons = ({
  handleCompleteClick, // 작성 완료 버튼 클릭 핸들러
  handleCancelPost, // 작성 취소 버튼 클릭 핸들러
}) => {
  return (
    <div className={styles["button-container"]}>
      <SubmitButton onClick={handleCompleteClick} />
      <CancelPostButton onClick={handleCancelPost} />
    </div>
  );
};

export default CreateModeButtons;
