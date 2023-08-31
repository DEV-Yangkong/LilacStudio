import React from "react";
import styles from "./ReleasedGame.module.css";
import { NoServiceWarning } from "../../../modules/NoServiceWarning/NoServiceWarning";

const ReleasedGame = () => {
  return (
    <section className={styles.releasedGame}>
      <h2 className={styles.releasedGameTitle}>출시된 게임</h2>
      <NoServiceWarning />
    </section>
  );
};

export default ReleasedGame;
