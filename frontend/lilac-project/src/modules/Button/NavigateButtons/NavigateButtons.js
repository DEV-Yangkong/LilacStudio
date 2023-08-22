// NavigateButtons/NavigateButtons.js
import React from "react";
import { ListButton } from "../ButtonComponents";

const NavigateButtons = ({ navigateToYouTubeList, navigateToNoticeBoard }) => {
  return (
    <>
      <ListButton onClick={navigateToYouTubeList} />
      <ListButton onClick={navigateToNoticeBoard} />
    </>
  );
};

export default NavigateButtons;
