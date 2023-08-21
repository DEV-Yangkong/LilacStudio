const FormatDate = (dateString) => {
  const IsoDateString = dateString;
  const FormattedDateString = IsoDateString.split("T")[0];
  return FormattedDateString.replace(/\./g, "-");
};

export default FormatDate;
