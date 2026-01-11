export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US").format(date);
};
export const parseDate = (dateString) => {
  return new Date(Date.parse(dateString));
};
