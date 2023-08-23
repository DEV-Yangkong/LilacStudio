// DetailPageButtons/NormalMode.js
import React from "react";
import { EditButton, DeleteButton } from "../ButtonComponents";
import NavigateToButtons from "../NavigateToButtons/NavigateToButtons";

const NormalModeButtons = ({
  handleEditModeClick,
  handleDeleteClick,
  navigateToButton,
}) => {
  return (
    <>
      <EditButton onClick={handleEditModeClick} />
      <DeleteButton onClick={handleDeleteClick} />
      <NavigateToButtons navigateToButton={navigateToButton} />
    </>
  );
};

export default NormalModeButtons;
