const { createCanvas, loadImage } = require("canvas");
const shorten = require("../utils/shorten");
const wrapText = require("../utils/wrapText");

module.exports = async (
  title,
  author,
  logo = "https://metaphore.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmetaphor.ee0ad64a.webp&w=640&q=75",
  head,
  writer
) => {
  const WIDTH = 1342;
  const HEIGHT = 853;
  const BORDER_SIZE = 15;

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
  ctx.font = "45px Inter Medium";
  ctx.fillStyle = "#03001C";
  ctx.fillText(head, 70, 200);
  // Draw underline
  var text = ctx.measureText(head);
  ctx.strokeStyle = "#03001C";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.lineTo(70, 220);
  ctx.lineTo(70 + text.width, 220);
  ctx.stroke();

  // Write Metaphor Story
  const titleLength = title.length;
  const yTitle = titleLength > 70 ? 730 : 620;
  const titleTruncate = titleLength > 70 ? shorten(title, 42) : title;
  ctx.font = "95px Inter ExtraBold";
  ctx.fillStyle = "#03001C";
  let wrappedText = wrapText(ctx, titleTruncate, 70, yTitle, 1200, 100);
  wrappedText[0].forEach(function (item) {
    ctx.fillText(item[0], item[1], item[2] - wrappedText[1] - 100);
  });

  // Draw Image
  const img = await loadImage(`https://github.com/${author}.png`);
  const imgPat = ctx.createPattern(img, "no-repeat");
  const minRadius = Math.min(img.width, img.height) / 2;
  // get scale of circle image
  const scale = 70 / minRadius;
  // transform to put origin at top left of bounding rectangle scaling to fit image pattern
  ctx.setTransform(scale, 0, 0, scale, 70, 657);
  ctx.fillStyle = imgPat;
  ctx.beginPath();
  ctx.arc(minRadius, minRadius, minRadius, 0, Math.PI * 2);
  ctx.fill();
  // reset the default transform
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Write the story teller
  ctx.font = "20px Inter ExtraBold";
  ctx.fillStyle = "#03001C";
  ctx.fillText(`${writer}:`, 230, 710);
  // Write author name
  ctx.font = "35px Inter ExtraBold";
  ctx.fillStyle = "#03001C";
  ctx.fillText(`git@${author}`, 230, 750);

  const logoImage = await loadImage(logo);
  const scaleFactor = Math.min(640 / logoImage.width, 440 / logoImage.height);
  const scaledWidth = logoImage.width * scaleFactor;
  const scaledHeight = logoImage.height * scaleFactor;

  ctx.drawImage(
    logoImage,
    1000,
    660,
    scaledWidth / 2 - 65,
    scaledHeight / 2 - 65
  );

  return canvas;
};
