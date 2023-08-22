// CreatePageButtons/CreateModeButtons
import React from "react";
import { SaveButton, CancelPostButton } from "../ButtonComponents";

export const CreateModeButtons = ({
  handleCompleteClick, // 작성 완료 버튼 클릭 핸들러
  handleCancelPost, // 작성 취소 버튼 클릭 핸들러
}) => {
  return (
    <>
      <SaveButton onClick={handleCompleteClick} />
      <CancelPostButton onClick={handleCancelPost} />
    </>
  );
};
