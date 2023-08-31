import React from "react";
import styles from "./DevelopingGame.module.css";
import { NoServiceWarning } from "../../../modules/NoServiceWarning/NoServiceWarning";

const DevelopingGame = () => {
  return (
    <section className={styles.developingGame}>
      <h2 className={styles.developingGameTitle}>개발중인 게임</h2>
      <NoServiceWarning />
    </section>
  );
};

export default DevelopingGame;
