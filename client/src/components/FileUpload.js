import React, { Fragment, useState } from 'react'
import Message from './Message'
import Progress from './Progress'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import { useStyles } from './FileUploadStyles'

import LinearProgress from '@material-ui/core/LinearProgress'
import DragAndDrop from './DragAndDrop/DragAndDrop'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Typography from '@material-ui/core/Typography'
import * as path from 'path'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const FileUpload = () => {
  const [file, setFile] = useState('')
  const history = useHistory()
  const [filename, setFilename] = useState('Choose File')
  const [uploadedFile, setUploadedFile] = useState({
    uuid: '',
    name: '',
    createdAt: '',
    filepath: '',
    clips: [],
  })
  const [message, setMessage] = useState('')
  const [uploadPercentage, setUploadPercentage] = useState(0)

  const onChange = (e) => {
    // console.log(typeof path.extname(e.target.files[0].name))
    if (
      e.target.files[0] &&
      path.extname(e.target.files[0].name.toLowerCase()) === '.mp4'
    ) {
      setFile(e.target.files[0])
      setFilename(e.target.files[0].name)
    } else {
      toast.error('File format not supported only .mp4 files accepted')
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          )
        },
      })

      console.log(res)

      setUploadedFile(res.data)
      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000)

      const { fileName, filePath } = res.data

      setMessage('File Uploaded')
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server')
      } else {
        setMessage(err.response.data.msg)
      }
      setUploadPercentage(0)
    }
  }

  console.log(uploadedFile)

  const classes = useStyles()
  return (
    <div>
      <ToastContainer />
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <DragAndDrop
            onChange={onChange}
            onSubmit={onSubmit}
            filename={filename}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12} style={{ marginTop: '2em' }}>
          {' '}
          <LinearProgress
            style={{
              height: '15px',
              width: '93%',
              borderRadius: '50px',
              margin: 'auto',
            }}
            variant='determinate'
            value={uploadPercentage}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Button
            variant='contained'
            color='default'
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            onClick={(e) => onSubmit(e)}
          >
            Upload
          </Button>
          {uploadedFile.uuid !== '' && (
            <Button
              variant='contained'
              color='default'
              className={classes.button}
              startIcon={<CloudUploadIcon />}
              onClick={() => history.push(`/make-clip/${uploadedFile.uuid}`)}
            >
              Make Clip
            </Button>
          )}
        </Grid>
      </Grid>

      {/* 
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form> */}

      {/* {uploadedFile.uuid !== '' && (
        <button onClick={() => history.push(`/make-clip/${uploadedFile.uuid}`)}>
          Make Clip
        </button>
      )} */}
    </div>
  )
}

export default FileUpload
