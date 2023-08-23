// CreatePost/CreatePost.js
import React from "react";
import { SaveButton, CancelPostButton } from "../ButtonComponents";
import styles from "./ButtonGroup.module.css";

const CreateModeButtons = ({
  handleCompleteClick, // 작성 완료 버튼 클릭 핸들러
  handleCancelPost, // 작성 취소 버튼 클릭 핸들러
}) => {
  return (
    <div className={styles["button-container"]}>
      <SaveButton onClick={handleCompleteClick} />
      <CancelPostButton onClick={handleCancelPost} />
    </div>
  );
};

export default CreateModeButtons;
