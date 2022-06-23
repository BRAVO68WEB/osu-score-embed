const express = require("express");
const router = express.Router();
const { png2svg } = require("svg-png-converter");
const {
  context,
  width,
  height,
  canvas,
  loadImage,
} = require("../helpers/canvas");
const { fetch_pp } = require("../functions/deamon");

router.get("/", async (req, res) => {
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);

  context.font = "bold 20pt Menlo";
  context.textAlign = "center";
  context.textBaseline = "top";

  const { username, mode } = req.query;

  const text = await fetch_pp(username, mode);
  context.fillStyle = "#fff";
  context.fillText(text, 180, 25);

  loadImage("src/assets/osu.png").then((image) => {
    context.drawImage(image, 10, 5, 70, 70);
    const buffer = canvas.toBuffer("image/png");
    async function main() {
      const result = await png2svg({
        tracer: "imagetracer",
        optimize: true,
        input: buffer,
        numberofcolors: 100,
        pathomit: 1,
      });
      res.contentType("image/svg+xml");
      res.send(result.content);
    }
    main();
    context.fillStyle = "#000";
  });
});

module.exports = router;
