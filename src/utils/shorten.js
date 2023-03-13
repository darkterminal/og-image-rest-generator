// Shorten a string to less than maxLen characters without truncating words.
module.exports = function (str, maxLen, separator = " ") {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
}
