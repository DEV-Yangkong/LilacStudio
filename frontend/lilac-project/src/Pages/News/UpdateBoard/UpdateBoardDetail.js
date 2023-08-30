import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./UpdateBoardDetail.module.css";
import AlertModal from "../../../modules/AlertModal/AlertModal";
import FormatDate from "../../../modules/FormatDate/FormatDate";
import GenerateEmbedCode from "../../../modules/GenerateCode/GenerateEmbedCode";
import {
  HandleEditClick,
  HandleSaveClick,
  HandleDelete,
} from "../../../modules/HandleFunction/HandleActions";
import DetailPostGroup from "../../../modules/Button/DetailPost/DetailPostGroup";

const UpdateBoardDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState({});

  useEffect(() => {
    if (!selectedPost) {
      const fetchPostDetail = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/v1/update_board/update/${postId}/`
          );
          setSelectedPost(response.data);
          setEditedPost(response.data);
          // 상세 페이지 로드 시 조회수 증가 요청 보냄
          try {
            const increaseResponse = await axios.post(
              `http://127.0.0.1:8000/api/v1/update_board/update/${postId}/increase-views/`
            );
            if (increaseResponse.status === 200) {
              setSelectedPost((prevState) => ({
                ...prevState,
                views_count: prevState.views_count + 1,
              }));
              console.log("Updated view count:", selectedPost.views_count);
            }
          } catch (error) {
            console.error("Error increasing views:", error);
          }
        } catch (error) {
          console.error("Error fetching post detail:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPostDetail();
    }
  }, [postId, selectedPost]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const EmbeddedCode = GenerateEmbedCode(
    isEditMode ? editedPost.video_url : selectedPost.video_url,
    selectedPost
  );

  return (
    <div className={styles["update-board-detail"]}>
      <h1>
        {isEditMode ? (
          <div className={styles["form-group"]}>
            <label htmlFor="title">제목</label>
            <input
              className={styles.input}
              value={editedPost.title}
              onChange={(e) =>
                setEditedPost({ ...editedPost, title: e.target.value })
              }
            />
          </div>
        ) : (
          selectedPost.title
        )}
      </h1>
      <h2>
        {isEditMode ? (
          <div className={styles["form-group"]}>
            <label htmlFor="subtitle">부제목</label>
            <input
              className={styles.input}
              value={editedPost.subtitle}
              onChange={(e) =>
                setEditedPost({ ...editedPost, subtitle: e.target.value })
              }
            />
          </div>
        ) : (
          selectedPost.subtitle
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
      <div className={styles["update-content-container"]}>
        {/* 이미지 편집 */}
        {isEditMode && (
          <div className={styles["form-group"]}>
            <label htmlFor="image_Url">이미지 주소</label>
            <input
              type="url"
              value={editedPost.image_url || ""}
              onChange={(e) =>
                setEditedPost({ ...editedPost, image_url: e.target.value })
              }
              className={styles.input}
            />
          </div>
        )}
        {/* 이미지 컨테이너 */}
        <div className={styles["post-image-container"]}>
          {!isEditMode && (
            <>
              {selectedPost.image && typeof selectedPost.image === "string" && (
                <img
                  src={`http://127.0.0.1:8000${selectedPost.image}`}
                  alt="Post-Img"
                  className={styles["post-image"]}
                />
              )}
              {selectedPost.image_url && (
                <img
                  src={selectedPost.image_url}
                  alt="URL-Img"
                  className={styles["post-image"]}
                />
              )}
            </>
          )}
          {isEditMode && editedPost.image_url && (
            <img
              src={editedPost.image_url}
              alt="URL-Img"
              className={styles["post-image"]}
            />
          )}
        </div>

        {/* 동영상 컨테이너 */}
        <div className={styles["video-content-container"]}>
          {/* 동영상 편집 */}
          {isEditMode && (
            <div className={styles["form-group"]}>
              <label htmlFor="video_Url">영상 주소</label>
              <input
                type="url"
                value={editedPost.video_url}
                onChange={(e) =>
                  setEditedPost({ ...editedPost, video_url: e.target.value })
                }
                className={styles.input}
              />
            </div>
          )}
          {/* 동영상 */}
          {selectedPost.video_url && (
            <div className={styles["video-container"]}>
              {/* 비디오 플레이어 또는 임베드 코드 표시 */}
              {EmbeddedCode}
            </div>
          )}
        </div>
        {/* 게시물 내용 */}
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
      {/* 버튼 */}
      <DetailPostGroup
        isEditMode={isEditMode}
        handleEditModeClick={() =>
          HandleEditClick(setIsEditMode, setEditedPost, selectedPost)
        }
        handleSaveClick={() =>
          HandleSaveClick(
            setIsEditMode,
            setEditedPost,
            editedPost,
            postId,
            setSelectedPost,
            navigate,
            (postId) =>
              `http://127.0.0.1:8000/api/v1/update_board/update/${postId}/`
          )
        }
        handleCancelClick={() => setIsEditMode(false)}
        handleDeleteClick={() =>
          HandleDelete(
            postId,
            setIsDeleteModalVisible,
            isDeleteModalVisible,
            navigate,
            "/news/update-board",
            (postId) =>
              `http://127.0.0.1:8000/api/v1/update_board/update/${postId}/`
          )
        }
        navigateToButton={() => navigate("/news/update-board")}
        isNonEditMode={!isEditMode}
      />
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

export default UpdateBoardDetail;
