import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./WritePostEB.module.css";
import AlertModal from "../../../modules/AlertModal/AlertModal";
import axios from "axios";
import * as HandleChange from "../../../modules/HandleFunction/HandleChange";
import CreateModeButtons from "../../../modules/Button/CreatePost/CreatePost";

const WritePostEB = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isPostSuccess, setIsPostSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userImageType, setUserImageType] = useState("url"); // 이미지 URL과 파일 첨부 옵션
  const [userImageUrl, setUserImageUrl] = useState("");
  const [userImageFile, setUserImageFile] = useState(null);
  const navigate = useNavigate();

  // 이미지 미리보기 업데이트 함수
  const updateImagePreview = () => {
    if (userImageType === "url") {
      setPreviewImageUrl(userImageUrl); // previewImageUrl로 변경
    } else if (userImageType === "file" && userImageFile) {
      const imageURL = URL.createObjectURL(userImageFile);
      setPreviewImageUrl(imageURL); // previewImageUrl로 변경
    } else {
      setPreviewImageUrl(""); // previewImageUrl로 변경
    }
  };

  // 이미지 URL 및 파일 변경 시 호출될 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserImageFile(file);
    updateImagePreview();
  };

  useEffect(() => {
    // 이미지 URL 및 파일이 변경될 때마다 미리보기 업데이트
    updateImagePreview();
  }, [userImageType, userImageUrl, userImageFile]);

  useEffect(() => {
    // axios 요청 전에 CSRF 토큰 설정
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
  }, []);

  const HandleVideoUrlChange = (e) => {
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

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("video_url", videoUrl);

    // 이미지 URL 또는 파일을 FormData에 추가
    if (userImageType === "url") {
      formData.append("image_url", userImageUrl);
    } else if (userImageType === "file" && userImageFile) {
      formData.append("image", userImageFile);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/event_board/",
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
    navigate("/news/event-board");
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
          <label htmlFor="videoUrl">영상 주소</label>
          <input
            type="url"
            id="videoUrl"
            value={videoUrl}
            onChange={HandleVideoUrlChange}
            required
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
        {/* 이미지 URL 및 파일 첨부 인풋 추가 */}
        <div className={styles["form-group"]}>
          <label htmlFor="userImageType">이미지 타입 선택</label>
          <select
            id="userImageType"
            value={userImageType}
            onChange={(e) => setUserImageType(e.target.value)}
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
                HandleChange.HandleImageChange(
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
              navigate("/news/event-board"); // 작성 성공한 경우 페이지 이동
            }
          }}
          message={modalMessage}
        />
      </form>
    </div>
  );
};

export default WritePostEB;
