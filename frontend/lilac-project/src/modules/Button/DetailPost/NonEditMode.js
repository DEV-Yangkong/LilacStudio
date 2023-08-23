// DetailPageButtons/NormalMode.js
import React from "react";
import { EditButton, DeleteButton } from "../ButtonComponents";
import NavigateButton from "./NavigateButton";

const NormalModeButtons = ({
  handleEditModeClick,
  handleDeleteClick,
  navigateToButton,
}) => {
  return (
    <>
      <EditButton onClick={handleEditModeClick} />
      <DeleteButton onClick={handleDeleteClick} />
      <NavigateButton navigateToButton={navigateToButton} />
    </>
  );
};

export default NormalModeButtons;
