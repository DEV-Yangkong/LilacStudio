import React from "react";
import styles from "./FreeBoard.module.css";
import { NoServiceWarning } from "../../../modules/NoServiceWarning/NoServiceWarning";

const FreeBoard = () => {
  return (
    <section className={styles.freeBoard}>
      <h2 className={styles.freeBoardTitle}>자유게시판</h2>
      <NoServiceWarning />
    </section>
  );
};

export default FreeBoard;
