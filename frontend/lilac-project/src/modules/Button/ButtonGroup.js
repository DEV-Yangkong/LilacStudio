import React from "react";
import { EditModeButtons, NormalModeButtons } from "./DetailPageButtons";
import { CreateModeButtons } from "./CreatePageButtons/CreatePageButtons";
import { NavigateButton } from "./NavigateButton";
import styles from "./ButtonGroup.module.css";

const ButtonGroup = ({
  isEditMode, // 상세페이지 수정모드
  isNonEditMode, // 상세페이지 일반모드
  isCreateMode, // 작성페이지
  handleEditModeClick, // 수정 시작 버튼 클릭 핸들러
  handleSaveClick, // 수정 완료 버튼 클릭 핸들러
  handleCancelClick, // 수정 취소 버튼 클릭 핸들러
  handleDeleteClick, // 삭제 버튼 클릭 핸들러
  navigateToButton, // 유튜브 리스트로 버튼 클릭 핸들러
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
      ) : isNonEditMode ? ( // 노말 모드일 때만 노말 모드 버튼 렌더링
        <NormalModeButtons
          handleEditModeClick={handleEditModeClick}
          handleDeleteClick={handleDeleteClick}
          handleCompleteClick={handleCompleteClick}
          handleCancelPost={handleCancelPost}
        />
      ) : isCreateMode ? (
        <CreateModeButtons
          handleCompleteClick={handleCompleteClick}
          handleCancelPost={handleCancelPost}
        />
      ) : null}
      <NavigateButton navigateToButton={navigateToButton} />
    </div>
  );
};

export default ButtonGroup;
