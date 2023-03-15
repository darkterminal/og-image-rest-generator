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
module.exports = function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  const lines = [];
  let line = '';

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth) {
      // truncate text if line is too long
      let truncatedText;
      if (line.length <= 60) {
        truncatedText = line.trim() + ' ';
      } else {
        truncatedText = line.trim().substring(0, 60) + '...';
      }
      lines.push([truncatedText, x, y]);
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }

  // add the last line
  const lastLine = line.trim();
  if (lastLine) {
    lines.push([lastLine, x, y]);
  }

  // calculate total line height
  const totalLineHeight = (lines.length - 1) * lineHeight;

  // return the words in array, along with the total line height
  return [lines, totalLineHeight];
};
