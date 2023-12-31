import React from "react";
import styles from "./Game.module.css";

const GameInfo = () => {
  return (
    <section className={styles.gameInfo}>
      <h2 className={styles.gameInfoTitle}>게임 정보</h2>
      <p className={styles.gameInfoText}>
        다가오는 게임에 대한 소개와 정보를 확인하세요.
      </p>
    </section>
  );
};

export default GameInfo;
