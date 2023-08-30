// HandleActions.js

import axios from "axios";

export const HandleEditClick = (setIsEditMode, setEditedPost, selectedPost) => {
  setIsEditMode(true);
  setEditedPost({
    Title: selectedPost.title,
    SubTitle: selectedPost.subtitle,
    Content: selectedPost.content,
    Image: selectedPost.image,
    ImageUrl: selectedPost.image_url,
    VideoUrl: selectedPost.video_url,
  });
};

export const HandleSaveClick = async (
  setIsEditMode,
  setEditedPost,
  editedPost,
  postId,
  setSelectedPost,
  navigate,
  updateApiPath
) => {
  try {
    if (!editedPost.VideoUrl) {
      editedPost.VideoUrl = ""; // video_url을 빈 문자열로 설정
    }

    const response = await axios.put(updateApiPath(postId), editedPost);

    if (response.status === 200) {
      setIsEditMode(false);
      setSelectedPost(response.data);
    }
  } catch (error) {
    console.error("Error updating post:", error);
  }
};

export const HandleDelete = async (
  postId,
  setIsDeleteModalVisible,
  isDeleteModalVisible,
  navigate,
  destination, // 이동할 경로를 전달받는 매개변수
  deleteApiPath // API 경로를 전달받는 매개변수
) => {
  try {
    const response = await axios.delete(
      deleteApiPath(postId) // 전달받은 경로를 사용
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
