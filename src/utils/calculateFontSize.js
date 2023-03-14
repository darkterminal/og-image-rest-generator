module.exports = function (
  ctx,
  text,
  maxWidth,
  maxHeight,
  minFontSize,
  maxFontSize
) {
  let fontSize = maxFontSize;
  let width = ctx.measureText(text).width;

  while (width > maxWidth || fontSize > maxHeight) {
    fontSize--;

    if (fontSize < minFontSize) {
      fontSize = minFontSize;
      break;
    }
    width = ctx.measureText(text).width;
  }

  return fontSize;
};
