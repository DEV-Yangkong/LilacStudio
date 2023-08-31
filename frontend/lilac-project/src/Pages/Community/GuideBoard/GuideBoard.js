import React from "react";
import styles from "./GuideBoard.module.css";
import { NoServiceWarning } from "../../../modules/NoServiceWarning/NoServiceWarning";

const GuideBoard = () => {
  return (
    <section className={styles.guideBoard}>
      <h2 className={styles.guideBoardTitle}>공략</h2>
      <NoServiceWarning />
    </section>
  );
};

export default GuideBoard;
