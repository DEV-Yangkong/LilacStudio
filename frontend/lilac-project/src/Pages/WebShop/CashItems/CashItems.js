import React from "react";
import styles from "./CashItems.module.css";
import { NoServiceWarning } from "../../../modules/NoServiceWarning/NoServiceWarning";

const CashItems = () => {
  return (
    <section className={styles.cashItems}>
      <h2 className={styles.cashItemsTitle}>캐시아이템</h2>
      <NoServiceWarning />
    </section>
  );
};

export default CashItems;
