import React from "react";
import styles from "./Auction.module.css";
import { NoServiceWarning } from "../../../modules/NoServiceWarning/NoServiceWarning";

const Auction = () => {
  return (
    <section className={styles.auction}>
      <h2 className={styles.auctionTitle}>경매장</h2>
      <NoServiceWarning />
    </section>
  );
};

export default Auction;
