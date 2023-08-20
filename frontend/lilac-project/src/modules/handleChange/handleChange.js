export const setUserImageFile = (file, setUserImageFile) => {
  setUserImageFile(file);
};

export const setUserImageUrl = (url, setUserImageUrl) => {
  setUserImageUrl(url);
};

export const handleTitleChange = (e, setTitle) => {
  setTitle(e.target.value);
};

export const handleContentChange = (e, setContent) => {
  setContent(e.target.value);
};

export const handleUserImageTypeChange = (
  e,
  setUserImageType,
  setUserImageUrl,
  setUserImageFile
) => {
  const newUserImageType = e.target.value;
  setUserImageType(newUserImageType);

  if (newUserImageType === "url") {
    setUserImageFile(null);
    setUserImageUrl("");
  }
};

export const handleImageChange = (
  e,
  setUserImageFile,
  setUserImageType,
  setUserImageUrl
) => {
  const selectedImage = e.target.files[0];

  if (selectedImage) {
    setUserImageFile(selectedImage);
    setUserImageType("file");
    setUserImageUrl("");
  }
};
