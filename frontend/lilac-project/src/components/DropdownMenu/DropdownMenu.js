import React from "react";
import { Link } from "react-router-dom";
import styles from "./DropdownMenu.module.css";

const DropdownMenu = () => {
  return (
    <div className={styles.dropdownMenu}>
      <ul>
        <li>
          <Link to="/news">새소식 1</Link>
        </li>
        <li>
          <Link to="/news2">새소식 2</Link>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
