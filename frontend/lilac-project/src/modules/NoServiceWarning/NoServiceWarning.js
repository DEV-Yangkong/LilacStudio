import React from "react";
import styles from "./NoServiceWarning.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export const NoServiceWarning = () => (
  <section className={styles.warningContainer}>
    <FontAwesomeIcon
      icon={faExclamationTriangle}
      className={styles.waringIcon}
    />
    <h2 className={styles.warningTitle}>안내</h2>
    <p className={styles.warningMessage}>해당 서비스 준비 중입니다.</p>
  </section>
);
