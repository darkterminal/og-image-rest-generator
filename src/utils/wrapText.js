/**
 *
 * @param {Object} ctx the context for the canvas
 * @param {String} text the text we wish to wrap
 * @param {Number} x the starting x position of the text
 * @param {Number} y the starting y position of the text
 * @param {Number} maxWidth the maximum width, i.e the width of the container
 * @param {Number} lineHeight the height of one line (as defined by us)
 * @returns Array
 */
module.exports = function (ctx, text, x, y, maxWidth, lineHeight) {
  // First, split the words by spaces
  let words = text.split(" ");
  // Then we'll make a few variables to store info about our line
  let line = "";
  let testLine = "";
  // wordArray is what we'l' return, which will hold info on
  // the line text, along with its x and y starting position
  let wordArray = [];
  // totalLineHeight will hold info on the line height
  let totalLineHeight = 0;

  // Next we iterate over each word
  for (var n = 0; n < words.length; n++) {
    // And test out its length
    testLine += `${words[n]} `;
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    // If it's too long, then we start a new line
    if (testWidth > maxWidth && n > 0) {
      wordArray.push([line, x, y]);
      y += lineHeight;
      totalLineHeight += lineHeight;
      line = `${words[n]} `;
      testLine = `${words[n]} `;
    } else {
      // Otherwise we only have one line!
      line += `${words[n]} `;
    }
    // Whenever all the words are done, we push whatever is left
    if (n === words.length - 1) {
      wordArray.push([line, x, y]);
    }
  }

  // And return the words in array, along with the total line height
  // which will be (totalLines - 1) * lineHeight
  return [wordArray, totalLineHeight];
};
