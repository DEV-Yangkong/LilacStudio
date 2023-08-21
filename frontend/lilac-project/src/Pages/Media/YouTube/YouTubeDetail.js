import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./YouTubeDetail.module.css";
import AlertModal from "../../../modules/AlertModal/AlertModal";
import GenerateEmbedCode from "../../../modules/GenerateEmbedCode/GenerateEmbedCode";
import FormatDate from "../../../modules/FormatDate/FormatDate";
import {
  HandleEditClick,
  HandleSaveClick,
  HandleDelete,
} from "../../../modules/HandleFunction/HandleActions";

const YouTubeDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState({});
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/youtube_videos/${postId}/`
        );
        setSelectedPost(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching post detail:", error);
      }
    };

    fetchPostDetail();
  }, [postId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["youtube-detail"]}>
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
          {FormatDate(selectedPost.created_at)}
        </span>
        <span className={styles["post-views"]}>
          조회수 {selectedPost.views_count}
        </span>
      </div>
      <div className={styles["video-content-container"]}>
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
          {GenerateEmbedCode(
            isEditMode ? editedPost.video_url : selectedPost.video_url
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
            <button className={styles["save-button"]} onClick={HandleSaveClick}>
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
            <button className={styles["edit-button"]} onClick={HandleEditClick}>
              수정
            </button>
            <button className={styles["delete-button"]} onClick={HandleDelete}>
              삭제
            </button>
            <button
              className={styles["list-button"]}
              onClick={() => navigate("/media/youtube")}
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

export default YouTubeDetail;
