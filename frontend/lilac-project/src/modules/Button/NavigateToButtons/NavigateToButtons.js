// // NavigateToButtons/NavigateToButtons.js
import React from "react";
import { ListButton } from "../ButtonComponents";

const NavigateToButtons = ({ navigateToButton }) => {
  return (
    <>
      <ListButton onClick={navigateToButton} />
    </>
  );
};

export default NavigateToButtons;
