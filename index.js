const fs = require('fs')
const express = require('express')
const {
  createCanvas,
  loadImage
} = require('canvas')
const {
  png2svg
} = require('svg-png-converter')
const {
  Osu
} = require('osu-wrapper')

require('dotenv').config()

const client = new Osu(process.env.OSU_API_KEY)

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

const width = 280
const height = 80

const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')

function roundToTwo(num) {
  return +(Math.round(num + "e+2")  + "e-2");
}

const fetch_pp = async (username, mode) => {
  if (username === undefined) {
    username = 'bravo68web'
  }
  if (mode === undefined) {
    mode = '0'
  }
  const result = await client.getUser({
    u: username,
    m: mode
  })
  return "PP: "+ roundToTwo(result[0].pp_raw)
}

const fetch_acc = async (username, mode) => {
  if (username === undefined) {
    username = 'bravo68web'
  }
  if (mode === undefined) {
    mode = '0'
  }
  const result = await client.getUser({
    u: username,
    m: mode
  })
  return "Acc: "+ roundToTwo(result[0].accuracy);
}

app.get('/pp', async (req, res) => {
  context.fillStyle = '#000'
  context.fillRect(0, 0, width, height)

  context.font = 'bold 20pt Menlo'
  context.textAlign = 'center'
  context.textBaseline = 'top'

  const {
    username,
    mode
  } = req.query

  const text = await fetch_pp(username, mode)
  context.fillStyle = '#fff'
  context.fillText(text, 180, 25)

  loadImage('./osu.png').then(image => {
    context.drawImage(image, 10, 5, 70, 70)
    const buffer = canvas.toBuffer('image/png')
    async function main() {
      const result = await png2svg({
        tracer: 'imagetracer',
        optimize: true,
        input: buffer,
        numberofcolors: 100,
        pathomit: 1,
      })
      res.contentType('image/svg+xml');
      res.send(result.content);
    }
    main();
    context.fillStyle = '#000'
  })
})

app.get('/pp_acc', async (req, res) => {
  context.fillStyle = '#000'
  context.fillRect(0, 0, width, height)

  context.font = 'bold 20pt Menlo'
  context.textAlign = 'center'
  context.textBaseline = 'top'

  const {
    username,
    mode
  } = req.query

  const text = await fetch_acc(username, mode)
  const text2 = await fetch_pp(username, mode)

  context.fillStyle = '#fff'
  context.fillText(text, 180, 10)
  context.fillText(text2, 180, 40)

  loadImage('./osu.png').then(image => {
    context.drawImage(image, 10, 5, 70, 70)
    const buffer = canvas.toBuffer('image/png')
    async function main() {
      const result = await png2svg({
        tracer: 'imagetracer',
        optimize: true,
        input: buffer,
        numberofcolors: 100,
        pathomit: 1,
      })
      res.contentType('image/svg+xml');
      res.send(result.content);
    }
    main();
    context.fillStyle = '#000'
  })
})

app.listen(3000, function () {
  console.log('listening on port 3000')
})