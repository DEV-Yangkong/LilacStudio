import React from "react";
import styles from "./Reports.module.css";
import { NoServiceWarning } from "../../../modules/NoServiceWarning/NoServiceWarning";

const Reports = () => {
  return (
    <section className={styles.reports}>
      <h2 className={styles.reportsTitle}>신고</h2>
      <NoServiceWarning />
    </section>
  );
};

export default Reports;
