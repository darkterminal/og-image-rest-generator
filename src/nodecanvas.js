const {
  createCanvas,
  loadImage
} = require("canvas");
const wrapText = require("./utils/wrapText");
const shorten = require("./utils/shorten");

exports.classicSeoBanner = async (req, res) => {
  try {
    let { articleName, author, language = "javascript" } = req.query;

    const WIDTH = 1342;
    const HEIGHT = 853;
    const BORDER_SIZE = 10;

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

    ctx.fillStyle = "#03001C";
    ctx.font = "35px bold Helvetica";
    ctx.fillText(`Storyteller: ${author} - Language: ${language}`, 85, 600);

    ctx.font = "65px bold Helvetica";
    ctx.fillStyle = "#03001C";
    let wrappedText = wrapText(ctx, articleName, 85, 723, 1200, 80);
    wrappedText[0].forEach(function (item) {
      ctx.fillText(item[0], item[1], item[2] - wrappedText[1] - 200);
    });

    ctx.font = "35px Helvetica";
    ctx.fillStyle = "#03001C";
    ctx.fillText("Metaphor Story", 85, 553 - wrappedText[1] - 100);

    const buffer = canvas.toBuffer("image/png");
    res.setHeader("Content-Type", "image/png");
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate SEO banner");
  }
};

exports.seoBanner = async (req, res) => {
  const {
    title = "Untitle",
    author = "darkterminal",
    logo = "https://metaphore.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmetaphor.ee0ad64a.webp&w=640&q=75",
    head = "Metaphor Story",
    writer = "The Storyteller",
  } = req.query;

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
  ctx.font = "45px Helvetica";
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
  const yTitle = titleLength > 45 ? 730 : 620;
  const titleTruncate = titleLength > 65 ? shorten(title, 65) : title;
  ctx.font = "bold 95px Helvetica";
  ctx.fillStyle = "#03001C";
  let wrappedText = wrapText(ctx, titleTruncate, 70, yTitle, 1200, 100);
  wrappedText[0].forEach(function (item) {
    ctx.fillText(item[0], item[1], item[2] - wrappedText[1] - 200);
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
  ctx.font = "bold 20px Helvetica";
  ctx.fillStyle = "#03001C";
  ctx.fillText(`${writer}:`, 230, 710);
  // Write author name
  ctx.font = "bold 35px Helvetica";
  ctx.fillStyle = "#03001C";
  ctx.fillText(`git@${author}`, 230, 750);

  const logoImage = await loadImage(logo);
  const scaleFactor = Math.min(640 / logoImage.width, 440 / logoImage.height);
  const scaledWidth = logoImage.width * scaleFactor;
  const scaledHeight = logoImage.height * scaleFactor;

  const x = (640 - scaledWidth) / 2;
  const y = (440 - scaledHeight) / 2;

  ctx.drawImage(
    logoImage,
    1000,
    660,
    scaledWidth / 2 - 65,
    scaledHeight / 2 - 65
  );

  const buffer = canvas.toBuffer("image/png");
  res.setHeader("Content-Type", "image/png");
  res.send(buffer);
};
