import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./NoticeBoardDetail.module.css";
import AlertModal from "../../../modules/AlertModal/AlertModal";
import formatDate from "../../../modules/formatDate/formatDate";
import generateEmbedCode from "../../../modules/generateEmbedCode/generateEmbedCode";
import {
  handleEditClick,
  handleSaveClick,
  handleDelete,
} from "../../../modules/handleActions/handleActions";

const NoticeBoardDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState({});
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!selectedPost) {
      // selectedPost가 null인 경우에만 데이터를 가져옴
      const fetchPostDetail = async () => {
        try {
          console.log("Fetching post detail...");
          const response = await axios.get(
            `http://127.0.0.1:8000/api/v1/notice_board/notices/${postId}/`
          );
          console.log("Response:", response);
          setSelectedPost(response.data); // 데이터를 업데이트
        } catch (error) {
          console.error("Error fetching post detail:", error);
        } finally {
          console.log("Setting isLoading to false...");
          setIsLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
        }
      };

      console.log("Calling fetchPostDetail...");
      fetchPostDetail();
    }
  }, [postId, selectedPost]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["notice-board-detail"]}>
      <h2>
        {isEditMode ? (
          <input
            className={styles["edit-title-input"]}
            value={editedPost.title}
            onChange={(e) =>
              setEditedPost({ ...editedPost, title: e.target.value })
            }
          />
        ) : (
          selectedPost.title
        )}
      </h2>
      <div className={styles["post-info"]}>
        <span className={styles["post-date"]}>
          {formatDate(selectedPost.created_at)}
        </span>
        <span className={styles["post-views"]}>
          조회수 {selectedPost.views_count}
        </span>
      </div>
      <div className={styles["notice-content-container"]}>
        {isEditMode && (
          <div className={styles["video-url-container"]}>
            <input
              className={styles["video-url-input"]}
              value={editedPost.video_url}
              onChange={(e) =>
                setEditedPost({ ...editedPost, video_url: e.target.value })
              }
            />
          </div>
        )}
        <div className={styles["video-container"]}>
          {/* 비디오 URL 오류 시 모달 표시 */}
          {videoError && (
            <AlertModal
              isOpen={videoError}
              onClose={() => setVideoError(false)}
              message="유효하지 않은 비디오 URL입니다."
            />
          )}
          {generateEmbedCode(
            isEditMode ? editedPost.video_url : selectedPost.video_url,
            selectedPost,
            setVideoError
          )}
        </div>
        <div className={styles["post-image-container"]}>
          {/* 이미지 미리보기 부분 */}
          {isEditMode ? (
            <div className={styles["image-url-container"]}>
              <input
                className={styles["image-url-input"]}
                value={editedPost.image_url}
                onChange={(e) =>
                  setEditedPost({ ...editedPost, image_url: e.target.value })
                }
              />
            </div>
          ) : (
            <img
              src={selectedPost.image_url}
              alt="Post Thumbnail"
              className={styles["post-image"]}
            />
          )}
        </div>
        <div className={styles["post-content"]}>
          {isEditMode ? (
            <textarea
              value={editedPost.content}
              onChange={(e) =>
                setEditedPost({ ...editedPost, content: e.target.value })
              }
            />
          ) : (
            selectedPost.content
          )}
        </div>
      </div>
      <div className={styles["button-container"]}>
        {isEditMode ? (
          <>
            <button
              className={styles["save-button"]}
              onClick={() =>
                handleSaveClick(
                  setIsEditMode,
                  setEditedPost,
                  editedPost,
                  postId,
                  setSelectedPost,
                  setVideoError,
                  navigate,
                  (postId) =>
                    `http://127.0.0.1:8000/api/v1/notice_board/${postId}/`
                )
              }
            >
              저장
            </button>
            <button
              className={styles["cancel-button"]}
              onClick={() => setIsEditMode(false)}
            >
              취소
            </button>
          </>
        ) : (
          <>
            <button className={styles["edit-button"]} onClick={handleEditClick}>
              수정
            </button>
            <button
              className={styles["delete-button"]}
              onClick={() =>
                handleDelete(
                  postId,
                  setIsDeleteModalVisible,
                  isDeleteModalVisible,
                  navigate,
                  "/news/notice-board",
                  (postId) =>
                    `http://127.0.0.1:8000/api/v1/notice_board/${postId}/`
                )
              }
            >
              삭제
            </button>
            <button
              className={styles["list-button"]}
              onClick={() => navigate("/news/notice-board")}
            >
              목록
            </button>
          </>
        )}
      </div>
      {isDeleteModalVisible && (
        <AlertModal
          isOpen={isDeleteModalVisible}
          onClose={() => setIsDeleteModalVisible(false)}
          message="포스트가 삭제되었습니다."
        />
      )}
    </div>
  );
};

export default NoticeBoardDetail;
