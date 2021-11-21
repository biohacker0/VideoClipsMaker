const express = require('express')
const fileUpload = require('express-fileupload')
const connectDB = require('./config/db')
const app = express()
var cors = require('cors')
app.use(cors())
connectDB()

app.use(fileUpload())
app.use(express.static('public'))
app.use(express.static('storage'))
app.use(express.json({ extended: false }))

// Upload Endpoint
app.use('/upload', require('./routes/file'))

//download endpoint
app.use('/download', require('./routes/file'))

// make clip endpoint
app.use('/make-clip', require('./routes/file'))

//download clip
app.use('/download-clip', require('./routes/file'))

//delete clip
app.use('/delete-clip', require('./routes/file'))

const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => console.log('Server Started...'))
