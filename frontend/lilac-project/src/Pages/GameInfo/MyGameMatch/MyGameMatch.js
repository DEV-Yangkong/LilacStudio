import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import styles from "./MyGameMatch.module.css";
import { Link } from "react-router-dom";

function MyGameMatch() {
  return (
    <section className={styles.myGameMatch}>
      <h1 className={styles.title}>게임 매칭 테스트</h1>
      <div className={styles.mainWrap}>
        <h2 className={styles.gameTitle}>나의 인생 게임 찾기</h2>
        <Link to="/game-info/my-game-match/quiz" className={styles.startButton}>
          테스트 시작
        </Link>
        <div className={styles.sharingWrap}>
          <button className={styles.sharingLinkButton}>
            <FontAwesomeIcon icon={faLink} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default MyGameMatch;
