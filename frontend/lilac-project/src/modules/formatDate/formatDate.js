const FormatDate = (dateString) => {
  const isoDateString = dateString;
  const formattedDateString = isoDateString.split("T")[0];
  return formattedDateString.replace(/\./g, "-");
};

export default FormatDate;
