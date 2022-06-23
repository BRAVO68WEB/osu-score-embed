const { createCanvas, loadImage } = require("canvas");

const width = 280;
const height = 80;

const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

module.exports = {
  context,
  width,
  height,
  canvas,
  loadImage,
};
