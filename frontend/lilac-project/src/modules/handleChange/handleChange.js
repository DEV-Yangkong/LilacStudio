export const handleTitleChange = (e, setTitle) => {
  setTitle(e.target.value);
};

export const handleContentChange = (e, setContent) => {
  setContent(e.target.value);
};

// export const handleVideoUrlChange = (e, setVideoUrl, extractThumbnailUrl) => {
//   const newVideoUrl = e.target.value;
//   setVideoUrl(newVideoUrl);
//   extractThumbnailUrl(newVideoUrl);
// };

export const handleUserImageTypeChange = (
  e,
  setUserImageType,
  setUserImageFile,
  setUserImageUrl
) => {
  setUserImageType(e.target.value);
  setUserImageFile(null);
  setUserImageUrl("");
};

export const handleImageChange = (
  e,
  setUserImageFile,
  setUserImageType,
  setUserImageUrl
) => {
  const selectedImage = e.target.files[0];
  console.log("Selected Image:", selectedImage); // 콘솔에 이미지 출력
  if (selectedImage) {
    setUserImageFile(selectedImage);
    setUserImageType("file");
    setUserImageUrl("");
  }
};
