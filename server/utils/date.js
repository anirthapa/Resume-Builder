// Function to format a date into a readable string
export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US").format(date);
};
 
// Function to parse a date string into a Date object
export const parseDate = (dateString) => {
  return new Date(Date.parse(dateString));
};

// Function to check if a date is valid
export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

// Function to get the difference in days between two dates
export const dateDifferenceInDays = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Function to get the difference in months between two dates
export const dateDifferenceInMonths = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
};

// Function to get the difference in years between two dates
export const dateDifferenceInYears = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
};

//  Function to add days to a date
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
