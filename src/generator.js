const { createCanvas } = require("canvas"); // For canvas.
const fs = require("@cyclic.sh/s3fs");

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  const _buffer = new Buffer.from(bitmap, "base64");
  return _buffer.toString("base64");
}

/**
 * REST API Generator
 * @param {String} canonicalName this is the name we'll use to save our image (slugify first: Recomended!)
 * @param {Array} gradientColors an array of two colors, i.e. [ '#ffffff', '#000000' ], used for our gradient
 * @param {String} articleName the title of the article or site you want to appear in the image
 * @param {String} articleCategory the category which that article sits in - or the subtext of the article
 * @param {String} emoji the emoji you want to appear in the image.
 * @returns
 */
const generateMainImage = async function (
  canonicalName,
  gradientColors,
  articleName,
  articleCategory,
  emoji
) {
  articleCategory = articleCategory.toUpperCase();
  // gradientColors is an array [ c1, c2 ]
  if (typeof gradientColors === "undefined") {
    gradientColors = ["#8005fc", "#073bae"]; // Backup values
  }

  // Create canvas
  const canvas = createCanvas(1342, 853);
  const ctx = canvas.getContext("2d");

  // Add gradient - we use createLinearGradient to do this
  let grd = ctx.createLinearGradient(0, 853, 1352, 0);
  grd.addColorStop(0, gradientColors[0]);
  grd.addColorStop(1, gradientColors[1]);
  ctx.fillStyle = grd;
  // Fill our gradient
  ctx.fillRect(0, 0, 1342, 853);

  // Write our Emoji onto the canvas
  ctx.fillStyle = "white";
  ctx.font = "95px Helvetica";
  ctx.fillText(emoji, 85, 700);

  // Add our title text
  ctx.font = "95px bold Helvetica";
  ctx.fillStyle = "white";
  let wrappedText = wrapText(ctx, articleName, 85, 753, 1200, 100);
  wrappedText[0].forEach(function (item) {
    // We will fill our text which is item[0] of our array, at coordinates [x, y]
    // x will be item[1] of our array
    // y will be item[2] of our array, minus the line height (wrappedText[1]), minus the height of the emoji (200px)
    ctx.fillText(item[0], item[1], item[2] - wrappedText[1] - 200); // 200 is height of an emoji
  });

  // Add our category text to the canvas
  ctx.font = "35px bold Helvetica";
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fillText(articleCategory, 85, 553 - wrappedText[1] - 100); // 853 - 200 for emoji, -100 for line height of 1

  if (fs.existsSync(`./images/${canonicalName}.png`)) {
    return "Images Exist! We did not create any";
  } else {
    // Set canvas as to png
    try {
      const canvasData = await canvas.encode("png");
      // Save file
      fs.writeFileSync(`./images/${canonicalName}.png`, canvasData);
      const base64Image = base64_encode(`./images/${canonicalName}.png`);
      fs.unlinkSync(`./images/${canonicalName}.png`);
      return base64Image;
    } catch (e) {
      console.log(e);
      return "Could not create png image this time.";
    }
  }
};

module.exports = { generateMainImage }
