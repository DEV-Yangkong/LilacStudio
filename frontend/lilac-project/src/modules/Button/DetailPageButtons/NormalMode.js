// DetailPageButtons/NormalMode.js
import React from "react";
import {
  EditButton,
  DeleteButton,
  SubmitButton,
  CancelPostButton,
} from "../ButtonComponents";

const NormalModeButtons = ({
  handleEditModeClick,
  handleDeleteClick,
  handleCompleteClick,
  handleCancelPost,
}) => {
  return (
    <>
      <EditButton onClick={handleEditModeClick} />
      <DeleteButton onClick={handleDeleteClick} />
      <SubmitButton onClick={handleCompleteClick} />
      <CancelPostButton onClick={handleCancelPost} />
    </>
  );
};

export default NormalModeButtons;
