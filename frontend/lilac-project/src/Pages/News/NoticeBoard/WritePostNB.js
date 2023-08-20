import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./WritePostNB.module.css";
import AlertModal from "../../../modules/AlertModal/AlertModal";
import axios from "axios";
import Modal from "react-modal";
import {
  handleTitleChange,
  handleContentChange,
  handleUserImageTypeChange,
  handleImageChange,
} from "../../../modules/handleChange/handleChange";

const WritePostNB = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [userImageType, setUserImageType] = useState("url");
  const [userImageUrl, setUserImageUrl] = useState("");
  const [userImageFile, setUserImageFile] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isPostSuccess, setIsPostSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    Modal.setAppElement("#root");

    // axios 요청 전에 CSRF 토큰 설정
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
  }, []);

  const handleVideoUrlChange = (e) => {
    const newVideoUrl = e.target.value;
    setVideoUrl(newVideoUrl);

    // 직접 setThumbnailUrl을 호출하여 썸네일 업데이트
    const videoId = newVideoUrl.match(/v=([^&]+)/);
    if (videoId) {
      const thumbnailUrl = `https://i.ytimg.com/vi/${videoId[1]}/maxresdefault.jpg`;
      setThumbnailUrl(thumbnailUrl);
    } else {
      setThumbnailUrl("");
    }
  };

  // const handleVideoUrlChange = (e) => {
  //   const newVideoUrl = e.target.value;
  //   setVideoUrl(newVideoUrl);
  //   extractThumbnailUrl(newVideoUrl);
  // };

  // const extractThumbnailUrl = (url) => {
  //   const videoId = url.match(/v=([^&]+)/);
  //   if (videoId) {
  //     const thumbnailUrl = `https://i.ytimg.com/vi/${videoId[1]}/maxresdefault.jpg`;
  //     setThumbnailUrl(thumbnailUrl);
  //   } else {
  //     setThumbnailUrl("");
  //   }
  // };

  const UserImagePreview = () => {
    if (userImageType === "url" && userImageUrl) {
      return (
        <div className={styles["form-group"]}>
          <label>이미지 미리보기</label>
          <img
            src={userImageUrl}
            alt=""
            className={styles.thumbnail}
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </div>
      );
    } else if (userImageType === "file" && userImageFile) {
      return (
        <div className={styles["form-group"]}>
          <label>이미지 미리보기</label>
          <img
            src={URL.createObjectURL(userImageFile)}
            alt=""
            className={styles.thumbnail}
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </div>
      );
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("video_url", videoUrl);

    // Check if user chose URL or file for the user image
    if (userImageType === "url") {
      formData.append("image_url", userImageUrl);
    } else if (userImageType === "file") {
      // Generate a new file name (you can use a timestamp or any unique identifier)
      const newFileName = `${Date.now()}.jpg`;
      formData.append("image", userImageFile, newFileName);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/notice_board/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);

      if (response.status === 201) {
        setIsPostSuccess(true);
        setModalMessage("작성이 완료되었습니다.");
        setModalIsOpen(true);
      } else {
        setIsPostSuccess(false);
        console.error("작성에 실패하였습니다.");
        setModalMessage("작성에 실패하였습니다.");
        setModalIsOpen(true);
      }
    } catch (error) {
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

  const handleCancel = () => {
    navigate("/news/notice-board");
  };

  return (
    <div className={styles["write-post"]}>
      <h1 className={styles["post-title"]}>포스트 작성하기</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e, setTitle)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="userImageType">이미지 타입 선택</label>
          <select
            id="userImageType"
            value={userImageType}
            onChange={handleUserImageTypeChange}
          >
            <option value="url">URL</option>
            <option value="file">첨부</option>
          </select>
        </div>
        {userImageType === "url" ? (
          <div className={styles["form-group"]}>
            <label htmlFor="userImageUrl">이미지 URL</label>
            <input
              type="url"
              id="userImageUrl"
              value={userImageUrl}
              onChange={(e) => setUserImageUrl(e.target.value)}
              className={styles.input}
            />
          </div>
        ) : userImageType === "file" ? (
          <div className={styles["form-group"]}>
            <label htmlFor="userImageFile">이미지 첨부</label>
            <input
              type="file"
              id="userImageFile"
              accept="image/*"
              onChange={(e) =>
                handleImageChange(
                  e,
                  setUserImageFile,
                  setUserImageType,
                  setUserImageUrl
                )
              }
              className={styles.input}
            />
          </div>
        ) : null}
        <UserImagePreview />
        <div className={styles["form-group"]}>
          <label htmlFor="videoUrl">영상 주소</label>
          <input
            type="url"
            id="videoUrl"
            value={videoUrl}
            onChange={handleVideoUrlChange}
            className={styles.input}
          />
        </div>
        {thumbnailUrl && (
          <div className={styles["form-group"]}>
            <label htmlFor="thumbnail">썸네일 미리보기</label>
            <img
              src={thumbnailUrl}
              alt="Video Thumbnail"
              className={styles.thumbnail}
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </div>
        )}
        <div className={styles["form-group"]}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => handleContentChange(e, setContent)}
            required
            className={styles.textarea}
          />
        </div>
        <button type="submit" className={styles["submit-button"]}>
          작성 완료
        </button>
        <button
          type="button"
          className={styles["cancel-button"]}
          onClick={handleCancel}
        >
          취소
        </button>
        {modalMessage && (
          <div className={styles["modal-message"]}>{modalMessage}</div>
        )}
        <AlertModal
          isOpen={modalIsOpen}
          onClose={() => {
            setModalIsOpen(false);
            setModalMessage("");
            if (isPostSuccess) {
              setIsPostSuccess(false);
              navigate("/news/notice-board");
            }
          }}
          message={modalMessage}
        />
      </form>
    </div>
  );
};

export default WritePostNB;
