const stringUtils = {
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  lowercase: (str) => str.toLowerCase(),
  uppercase: (str) => str.toUpperCase(),
  // Add more string manipulation functions as needed
};
module.exports = stringUtils;

// Example usage:
// const { capitalize, lowercase, uppercase } = require('./utils/string');
// console.log(capitalize('hello')); // Output: Hello
// console.log(lowercase('HELLO')); // Output: hello
// console.log(uppercase('hello')); // Output: HELLO

// Add more string manipulation functions as needed

// get initials from a full name
stringUtils.getInitials = (fullName) => {
  return fullName
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase())
    .join("");
};

//  truncate a string to a specified length
stringUtils.truncate = (str, length) => {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
};

// check if a string is a palindrome
stringUtils.isPalindrome = (str) => {
  const cleanedStr = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
  return cleanedStr === cleanedStr.split("").reverse().join("");
};
