const FormatDate = (dateString) => {
  const IsoDateString = dateString;
  const FormattedDateString = IsoDateString.split("T")[0];
  const [year, month, day] = FormattedDateString.split("-");
  const formattedMonth = month.padStart(2, "0");
  const formattedDay = day.padStart(2, "0");
  return `${formattedMonth}.${formattedDay}`;
};

export default FormatDate;
