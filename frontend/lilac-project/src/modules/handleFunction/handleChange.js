// HandleChange.js

export const SetUserImageFile = (file, setUserImageFile) => {
  setUserImageFile(file);
};

export const SetUserImageUrl = (url, setUserImageUrl) => {
  setUserImageUrl(url);
};

export const HandleTitleChange = (e, setTitle) => {
  setTitle(e.target.value);
};

export const HandleContentChange = (e, setContent) => {
  setContent(e.target.value);
};

export const HandleUserImageTypeChange = (
  e,
  setUserImageType,
  setUserImageUrl,
  setUserImageFile
) => {
  const newUserImageType = e.target.value;
  setUserImageType(newUserImageType);

  if (newUserImageType === "url") {
    setUserImageFile(null); // Clear userImageFile
    setUserImageUrl(""); // Clear userImageUrl
  } else if (newUserImageType === "file") {
    setUserImageFile(null); // Clear userImageFile when switching to "file" type
  }
};

export const HandleImageChange = (
  e,
  setUserImageFile,
  setUserImageType,
  setUserImageUrl
) => {
  const selectedImage = e.target.files[0];

  if (selectedImage) {
    setUserImageFile(selectedImage);
    setUserImageType("file");
    setUserImageUrl(""); // Clear userImageUrl
  }
};
