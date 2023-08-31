import React from "react";
import styles from "./FanArt.module.css";
import { NoServiceWarning } from "../../../modules/NoServiceWarning/NoServiceWarning";

const FanArt = () => {
  return (
    <section className={styles.fanArt}>
      <h2 className={styles.fanArtTitle}>팬아트</h2>
      <NoServiceWarning />
    </section>
  );
};

export default FanArt;
