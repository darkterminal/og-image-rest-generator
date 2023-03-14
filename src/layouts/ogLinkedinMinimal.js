const { createCanvas, loadImage } = require("canvas");
const calculateFontSize = require("../utils/calculateFontSize");
const shorten = require("../utils/shorten");
const wrapText = require("../utils/wrapText");

module.exports = async (
  title,
  author,
  logo = "https://metaphore.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmetaphor.ee0ad64a.webp&w=640&q=75",
  head,
  writer
) => {
  // Canvas size
  const WIDTH = 600;
  const HEIGHT = 400;
  const BORDER_SIZE = 10;
  const PADDING_LEFT = 70;

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.lineWidth = BORDER_SIZE;
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(
    BORDER_SIZE / 2,
    BORDER_SIZE / 2,
    WIDTH - BORDER_SIZE,
    HEIGHT - BORDER_SIZE
  );

  // Write Metaphor Story
  ctx.font = "15px Inter Medium";
  ctx.fillStyle = "#03001C";
  ctx.fillText(head, PADDING_LEFT / 2, 120 / 2);
  // Draw underline
  var text = ctx.measureText(head);
  ctx.strokeStyle = "#03001C";
  ctx.lineWidth = 5 / 2;
  ctx.beginPath();
  ctx.lineTo(PADDING_LEFT / 2, 133 / 2);
  ctx.lineTo(PADDING_LEFT / 2 + text.width, 133 / 2);
  ctx.stroke();

  // Write Metaphor Story
  const titleLength = title.length;
  const yTitle = titleLength > 110 ? 40 : 60;
  const shortTitle = shorten(title, 110);

  ctx.font = `${calculateFontSize(
    ctx,
    shortTitle,
    WIDTH - BORDER_SIZE * 2,
    HEIGHT - BORDER_SIZE * 2,
    65 / 2,
    titleLength > 60 ? 75 / 2 : 95 / 2
  )}px Inter ExtraBold`;
  let wrappedText = wrapText(
    ctx,
    shortTitle,
    PADDING_LEFT / 2,
    yTitle / 2,
    1080 / 2,
    titleLength > 60 ? 80 / 2 : 90 / 2
  );
  let yAddition =  (450 / 2)
  if (wrappedText[0].length > 5) {
    wrappedText[0].pop();
    yAddition = (450 / 2) + 40
  }
  wrappedText[0].forEach(function (item) {
    ctx.fillText(item[0], item[1], (item[2] - wrappedText[1]) + yAddition);
  });

  // Draw Image
  const img = await loadImage(`https://github.com/${author}.png`);
  const imgPat = ctx.createPattern(img, "no-repeat");
  const minRadius = Math.min(img.width, img.height) / 2;
  // get scale of circle image
  const scale = 50 / 2 / minRadius;
  // transform to put origin at top left of bounding rectangle scaling to fit image pattern
  ctx.setTransform(scale, 0, 0, scale, PADDING_LEFT / 2, 635 / 2);
  ctx.fillStyle = imgPat;
  ctx.beginPath();
  ctx.arc(minRadius, minRadius, minRadius, 0, Math.PI * 2);
  ctx.fill();
  // reset the default transform
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Write the story teller
  ctx.font = `${20 / 2}px Inter ExtraBold`;
  ctx.fillStyle = "#03001C";
  ctx.fillText(`${writer}:`, 180 / 2, 675 / 2);
  // Write author name
  ctx.font = `${35 / 2}px Inter ExtraBold`;
  ctx.fillStyle = "#03001C";
  ctx.fillText(`git@${author}`, 180 / 2, 710 / 2);

  const logoImage = await loadImage(logo);
  const scaleFactor = Math.min(640 / logoImage.width, 440 / logoImage.height);
  const scaledWidth = logoImage.width * scaleFactor;
  const scaledHeight = logoImage.height * scaleFactor;

  ctx.drawImage(
    logoImage,
    890 / 2,
    625 / 2,
    (scaledWidth / 2 - 90) / 2,
    (scaledHeight / 2 - 90) / 2
  );

  return canvas;
};
