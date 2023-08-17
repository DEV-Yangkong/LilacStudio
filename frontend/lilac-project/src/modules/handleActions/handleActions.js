import axios from "axios";

export const handleEditClick = (setIsEditMode, setEditedPost, selectedPost) => {
  setIsEditMode(true);
  setEditedPost({ ...selectedPost });
};

export const handleSaveClick = async (
  setIsEditMode,
  setEditedPost,
  editedPost,
  postId,
  setSelectedPost,
  setVideoError,
  navigate
) => {
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/v1/notice_board/${postId}/`,
      editedPost
    );
    if (response.status === 200) {
      setIsEditMode(false);
      setSelectedPost(response.data);
    }
  } catch (error) {
    console.error("Error updating post:", error);
    // 추가: 비디오 URL 오류 처리
    if (error.response && error.response.status === 400) {
      setVideoError(true);
    }
  }
};

export const handleDelete = async (
  postId,
  setIsDeleteModalVisible,
  isDeleteModalVisible,
  navigate,
  destination // 이동할 경로를 전달받는 매개변수
) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/v1/notice_board/${postId}/`
    );
    if (response.status === 204) {
      if (!isDeleteModalVisible) {
        setIsDeleteModalVisible(true);

        setTimeout(() => {
          setIsDeleteModalVisible(false);
          navigate(destination); // 전달받은 경로로 이동
        }, 1500);
      }
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};
