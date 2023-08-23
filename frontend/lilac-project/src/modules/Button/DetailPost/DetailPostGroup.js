import React from "react";
import { EditModeButtons, NormalModeButtons } from "../DetailPost";
import styles from "../ButtonGroup.module.css";

const DetailPostGroup = ({
  isEditMode, // 상세페이지 수정모드
  isNonEditMode, // 상세페이지 일반모드
  handleEditModeClick, // 수정 시작 버튼 클릭 핸들러
  handleSaveClick, // 수정 완료 버튼 클릭 핸들러
  handleCancelClick, // 수정 취소 버튼 클릭 핸들러
  handleDeleteClick, // 삭제 버튼 클릭 핸들러
  navigateToButton, // 리스트로 버튼 클릭 핸들러
}) => {
  return (
    <div className={styles["button-container"]}>
      {isEditMode ? (
        <EditModeButtons
          handleSaveClick={handleSaveClick}
          handleCancelClick={handleCancelClick}
        />
      ) : isNonEditMode ? ( // 노말 모드일 때만 노말 모드 버튼 렌더링
        <NormalModeButtons
          handleEditModeClick={handleEditModeClick}
          handleDeleteClick={handleDeleteClick}
          navigateToButton={navigateToButton}
        />
      ) : null}
    </div>
  );
};

export default DetailPostGroup;
