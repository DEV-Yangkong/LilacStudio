import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./WritePostGB.module.css";
import AlertModal from "../../../modules/AlertModal/AlertModal";
import axios from "axios";
import * as HandleChange from "../../../modules/HandleFunction/HandleChange";
import CreateModeButtons from "../../../modules/Button/CreatePost/CreatePost";
import OnlyUserImagePreview from "../../../modules/UserImagePreview/OnlyUserImagePreview";

const WritePostGB = () => {
  const [title, setTitle] = useState("");
  const [userImageUrl, setUserImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isPostSuccess, setIsPostSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const navigate = useNavigate();

  // 이미지 미리보기 업데이트 함수
  const updateImagePreview = () => {
    {
      setPreviewImageUrl(userImageUrl);
    }
  };

  useEffect(() => {
    // 이미지 URL이 변경될 때마다 미리보기 업데이트
    updateImagePreview();
  }, [userImageUrl]);

  useEffect(() => {
    // axios 요청 전에 CSRF 토큰 설정
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image_url", userImageUrl);
    formData.append("content", content);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/gallery_board/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);

      if (response.status === 201) {
        // 작성 완료 후 필요한 동작 수행
        setIsPostSuccess(true);
        setModalMessage("작성이 완료되었습니다.");
        setModalIsOpen(true);
      } else {
        // 응답 상태 코드가 201이 아닌 경우 처리
        setIsPostSuccess(false);
        console.error("작성에 실패하였습니다.");
        setModalMessage("작성에 실패하였습니다.");
        setModalIsOpen(true);
      }
    } catch (error) {
      // API 요청이 실패한 경우 처리
      console.error("에러의 원인을 추적합니다");

      if (error.response && error.response.data.thumbnail_url) {
        console.error("영상의 URL이 유효하지 않습니다.");
        setModalMessage(
          "작성에 실패하였습니다. 영상의 URL이 유효하지 않습니다."
        );
        setModalIsOpen(true);
      } else if (error.response) {
        console.error("API response error:", error.response.data);
        setModalMessage("작성에 실패하였습니다. 응답 에러");
        setModalIsOpen(true);
      } else if (error.request) {
        console.error("No API response:", error.request);
        setModalMessage("작성에 실패하였습니다. 네트워크 오류");
        setModalIsOpen(true);
      } else {
        console.error("Other error:", error.message);
        setModalMessage("작성에 실패하였습니다.");
        setModalIsOpen(true);
      }
    }
  };

  const HandleCancel = () => {
    navigate("/media/gallery-board");
  };

  return (
    <div className={styles["write-post"]}>
      <h1 className={styles["post-title"]}>포스트 작성하기</h1>
      <form onSubmit={HandleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => HandleChange.HandleTitleChange(e, setTitle)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="userImageUrl">이미지 URL</label>
          <input
            type="url"
            id="userImageUrl"
            value={userImageUrl}
            onChange={(e) => setUserImageUrl(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <OnlyUserImagePreview userImageUrl={userImageUrl} />
        <div className={styles["form-group"]}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className={styles.textarea}
          />
        </div>
        {/* 버튼 */}
        <CreateModeButtons // CreatePost 버튼 컴포넌트 추가
          handleCompleteClick={HandleSubmit} // 작성 완료 버튼 핸들러
          handleCancelPost={HandleCancel} // 작성 취소 버튼 핸들러
        />
        <AlertModal
          isOpen={modalIsOpen}
          onClose={() => {
            setModalIsOpen(false);
            setModalMessage("");
            if (isPostSuccess) {
              setIsPostSuccess(false); // 확인 후 작성 완료 상태 초기화
              navigate("/media/gallery-board"); // 작성 성공한 경우 페이지 이동
            }
          }}
          message={modalMessage}
        />
      </form>
    </div>
  );
};

export default WritePostGB;
