// DetailPost/EditMode.js
import React from "react";
import { SaveButton, CancelButton } from "../ButtonComponents";

const EditModeButtons = ({ handleSaveClick, handleCancelClick }) => {
  return (
    <>
      <SaveButton onClick={handleSaveClick} />
      <CancelButton onClick={handleCancelClick} />
    </>
  );
};

export default EditModeButtons;
