// // NavigateButton/NavigateButton.js
import React from "react";
import { ListButton } from "../ButtonComponents";

const NavigateButton = ({ navigateToButton }) => {
  return (
    <>
      <ListButton onClick={navigateToButton} />
    </>
  );
};

export default NavigateButton;
