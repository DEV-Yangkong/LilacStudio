import React from "react";
import { EditModeButtons, NormalModeButtons } from "./DetailPageButtons";
import { CreateModeButtons } from "./CreatePageButtons/CreatePageButtons";
import { NavigateButtons } from "./NavigateButtons";
import styles from "./ButtonGroup.module.css";

const ButtonGroup = ({
  isEditMode,
  isCreateMode,
  handleEditModeClick, // 수정 시작 버튼 클릭 핸들러
  handleSaveClick, // 수정 완료 버튼 클릭 핸들러
  handleCancelClick, // 수정 취소 버튼 클릭 핸들러
  handleDeleteClick, // 삭제 버튼 클릭 핸들러
  navigateToYouTubeList, // 유튜브 리스트로 버튼 클릭 핸들러
  navigateToNoticeBoard, // 공지사항 리스트로 버튼 클릭 핸들러
  handleCompleteClick, // 작성 완료 버튼 클릭 핸들러
  handleCancelPost, // 작성 취소 버튼 클릭 핸들러
}) => {
  return (
    <div className={styles["button-container"]}>
      {isEditMode ? (
        <EditModeButtons
          handleSaveClick={handleSaveClick}
          handleCancelClick={handleCancelClick}
        />
      ) : isCreateMode ? (
        <CreateModeButtons
          handleCompleteClick={handleCompleteClick}
          handleCancelPost={handleCancelPost}
        />
      ) : (
        <NormalModeButtons
          handleEditModeClick={handleEditModeClick}
          handleDeleteClick={handleDeleteClick}
          handleCompleteClick={handleCompleteClick}
          handleCancelPost={handleCancelPost}
        />
      )}
      <NavigateButtons
        navigateToYouTubeList={navigateToYouTubeList}
        navigateToNoticeBoard={navigateToNoticeBoard}
      />
    </div>
  );
};

export default ButtonGroup;
