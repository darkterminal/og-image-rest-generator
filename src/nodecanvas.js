const ogDefault = require("./layouts/ogDefault");
const ogFacebook = require("./layouts/ogFacebook");
const ogFacebookMinimal = require("./layouts/ogFacebookMinimal");
const ogInstagram = require("./layouts/ogInstagram");
const ogInstagramMinimal = require("./layouts/ogInstagramMinimal");
const ogLinkedin = require("./layouts/ogLinkedin");
const ogLinkedinMinimal = require("./layouts/ogLinkedinMinimal");
const ogPinterest = require("./layouts/ogPinterest");
const ogTwitter = require("./layouts/ogTwitter");
const ogTwitterMinimal = require("./layouts/ogTwitterMinimal");

// @deprecated
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
    ctx.font = "35px Inter ExtraBold";
    ctx.fillText(`Storyteller: ${author} - Language: ${language}`, 85, 600);

    ctx.font = "65px Inter ExtraBold";
    ctx.fillStyle = "#03001C";
    let wrappedText = wrapText(ctx, articleName, 85, 723, 1200, 80);
    wrappedText[0].forEach(function (item) {
      ctx.fillText(item[0], item[1], item[2] - wrappedText[1] - 200);
    });

    ctx.font = "35px Inter Medium";
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
    template = 'default'
  } = req.query;

  let canvas;
  switch (template) {
    case "facebook":
      canvas = await ogFacebook(title, author, logo, head, writer);
      break;
    case "facebook-minimal":
      canvas = await ogFacebookMinimal(title, author, logo, head, writer);
      break;
    case "twitter":
      canvas = await ogTwitter(title, author, logo, head, writer);
      break;
    case "twitter-minimal":
      canvas = await ogTwitterMinimal(title, author, logo, head, writer);
      break;
    case "instagram":
      canvas = await ogInstagram(title, author, logo, head, writer);
      break;
    case "instagram-minimal":
      canvas = await ogInstagramMinimal(title, author, logo, head, writer);
      break;
    case "linkedin":
      canvas = await ogLinkedin(title, author, logo, head, writer);
      break;
    case "linkedin-minimal":
      canvas = await ogLinkedinMinimal(title, author, logo, head, writer);
      break;
    case "pinterest":
      canvas = await ogPinterest(title, author, logo, head, writer);
      break;
    default:
      canvas = await ogDefault(title, author, logo, head, writer);
      break;
  }

  const buffer = canvas.toBuffer("image/png");
  res.setHeader("Content-Type", "image/png");
  res.send(buffer);
};
