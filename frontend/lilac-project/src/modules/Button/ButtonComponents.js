// ButtonComponents.js
import React from "react";
import styles from "./ButtonGroup.module.css";

export const EditButton = ({ onClick }) => {
  return (
    <button className={styles["edit-button"]} onClick={onClick}>
      수정
    </button>
  );
};

export const DeleteButton = ({ onClick }) => {
  return (
    <button className={styles["delete-button"]} onClick={onClick}>
      삭제
    </button>
  );
};

export const ListButton = ({ onClick }) => {
  return (
    <button className={styles["list-button"]} onClick={onClick}>
      목록
    </button>
  );
};

export const SaveButton = ({ onClick }) => {
  return (
    <button className={styles["save-button"]} onClick={onClick}>
      저장
    </button>
  );
};

export const CancelButton = ({ onClick }) => {
  return (
    <button className={styles["cancel-button"]} onClick={onClick}>
      취소
    </button>
  );
};
