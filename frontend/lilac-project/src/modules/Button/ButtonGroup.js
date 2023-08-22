// ButtonGroup.js
import React from "react";
import styles from "./ButtonGroup.module.css";
import {
  EditButton,
  DeleteButton,
  ListButton,
  SaveButton,
  CancelButton,
} from "./ButtonComponents";

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
          <SaveButton onClick={handleSaveClick} />
          <CancelButton onClick={handleCancelClick} />
        </>
      ) : (
        <>
          <EditButton onClick={handleEditModeClick} />
          <DeleteButton onClick={handleDeleteClick} />
          <ListButton onClick={navigateToYouTubeList} />
        </>
      )}
    </div>
  );
};

export default ButtonGroup;
