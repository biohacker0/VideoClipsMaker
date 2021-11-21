const express = require('express')

const router = express.Router()

const File = require('../model/File')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const config = require('config')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path

const ffmpeg = require('fluent-ffmpeg')
const APP_BASE_URL = config.get('APP_BASE_URL')
ffmpeg.setFfmpegPath(ffmpegPath)

//Upload a video
router.post('/', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' })
  }
  const { clips } = req.body

  const file = req.files.file

  const fileFields = {}
  // let file = await File.findOne({ uuid: req.params.uuid })
  fileFields.uuid = uuidv4()
  fileFields.name = file.name.split(/\s/).join('')
  fileFields.filepath = `/video/${file.name.split(/\s/).join('')}`
  fileFields.createdAt = new Date().toLocaleDateString()
  if (clips) fileFields.clips = clips
  console.log(file.name.split(/\s/).join(''))

  try {
    fileSaved = new File(fileFields)

    file.mv(`storage/video/${file.name.split(/\s/).join('')}`, (err) => {
      if (err) {
        console.error(err)
        return res.status(500).send(err)
      }
    })
    await fileSaved.save()
    res.json(fileSaved)
  } catch (err) {
    console.log(err)
  }
})

//get video
router.get('/:uuid', async (req, res) => {
  try {
    const video = await File.findOne({ uuid: req.params.uuid })

    if (!video) {
      return res.status(400).json({ msg: 'No file Found' })
    }

    // return res.download(filePath, video.name, (err) => {
    //   if (err) {
    //     res.status(500).send({
    //       message: 'Could not download the file. ' + err,
    //     })
    //   }
    // })
    res.json(video)
  } catch (err) {
    console.log(err)
  }
})

router.post('/:uuid', async (req, res) => {
  try {
    //Store the data of clip on server
    const video = await File.findOne({ uuid: req.params.uuid })

    const { clipname, startingTime, duration } = req.body

    const videofilePath = `${__dirname}/../storage${video.filepath}`
    const clipfilePath = `${__dirname}/../storage/clip/${
      clipname.split(/\s/).join('') + path.extname(video.name)
    }`

    console.log({ videofilePath, clipfilePath })
    const newClip = {
      uuid: uuidv4(),
      name: clipname.split(/\s/).join(''),
      filepath: `/clip/${
        clipname.split(/\s/).join('') + path.extname(video.name)
      }`,
      createdAt: new Date().toLocaleDateString(),
      startingTime: startingTime,
      duration: duration,
    }

    //make clip and store
    console.log(`${__dirname}/../storage${video.filepath}`)
    console.log(
      `${__dirname}/../storage/clip/${
        clipname.split(/\s/).join('') + path.extname(video.name)
      }`
    )

    ffmpeg(videofilePath)
      .setStartTime(startingTime)
      .setDuration(duration)
      .output(clipfilePath)
      .on('end', function (err) {
        if (!err) {
          video.clips.unshift(newClip)
          video.save()
          res.json(video)
          console.log('successfully converted')
        }
      })
      .on('error', function (err) {
        console.log('conversion error: ', +err.message)
      })
      .run()
  } catch (err) {
    console.log(err)
  }
})

//download clips
router.get('/:uuid/:clipid', async (req, res) => {
  try {
    const video = await File.findOne({ uuid: req.params.uuid })

    if (!video) {
      return res.status(400).json({ msg: 'No file Found' })
    }

    const clip = video.clips.find((obj) => obj.uuid === req.params.clipid)
    if (!clip) {
      return res.status(400).json({ msg: 'No Clip Found' })
    }

    const clipfilePath = `${__dirname}/../storage${clip.filepath}`
    console.log(clipfilePath)
    res.download(clipfilePath)
  } catch (err) {
    console.log(err)
  }
})

//delete clip
router.delete('/:uuid/:clipid', async (req, res) => {
  try {
    const video = await File.findOne({ uuid: req.params.uuid })

    if (!video) {
      return res.status(400).json({ msg: 'No file Found' })
    }

    const clip = video.clips.find((obj) => obj.uuid === req.params.clipid)
    if (!clip) {
      return res.status(400).json({ msg: 'No Clip Found' })
    }
    const removeindex = video.clips
      .map((clip) => clip.uuid)
      .indexOf(req.params.clipid)

    const clipfilePath = `${__dirname}/../storage${clip.filepath}`

    fs.unlinkSync(clipfilePath)

    await video.clips.splice(removeindex, 1)

    await video.save()

    res.json(video)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
