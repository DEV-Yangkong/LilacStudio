// ButtonGroup.js
import React from "react";
import styles from "./ButtonGroup.module.css";

const ButtonGroup = ({
  isEditMode,
  handleEditModeClick,
  handleSaveClick,
  handleCancelClick,
  handleDeleteClick,
  navigateToYouTubeList,
}) => {
  return (
    <div className={styles["button-container"]}>
      {isEditMode ? (
        <>
          <button className={styles["save-button"]} onClick={handleSaveClick}>
            저장
          </button>
          <button
            className={styles["cancel-button"]}
            onClick={handleCancelClick}
          >
            취소
          </button>
        </>
      ) : (
        <>
          <button
            className={styles["edit-button"]}
            onClick={handleEditModeClick}
          >
            수정
          </button>
          <button
            className={styles["delete-button"]}
            onClick={handleDeleteClick}
          >
            삭제
          </button>
          <button
            className={styles["list-button"]}
            onClick={navigateToYouTubeList}
          >
            목록
          </button>
        </>
      )}
    </div>
  );
};

export default ButtonGroup;
