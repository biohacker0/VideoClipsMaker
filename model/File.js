const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  filepath: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: Date.now,
  },
  clips: [
    {
      uuid: { type: String, required: true },
      name: {
        type: String,
        required: true,
      },
      filepath: {
        type: String,
        required: true,
      },
      createdAt: {
        type: String,
        required: true,
        default: Date.now,
      },
      startingTime: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
      required: false,
    },
  ],
})

module.exports = User = mongoose.model('file', FileSchema)
