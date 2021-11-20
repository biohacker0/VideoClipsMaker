import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

// import './DragAndDropStyles.css'

// import uploadImg from '../../../public/assets/cloudupload.png'

import { useStyles } from '../FileUploadStyles'

const DropFileInput = ({ onChange, filename }) => {
  const wrapperRef = useRef(null)

  const classes = useStyles()

  const [fileList, setFileList] = useState([])

  const onDragEnter = () => wrapperRef.current.classList.add('dragover')

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover')

  const onDrop = (e) => {
    wrapperRef.current.classList.remove('dragover')
  }

  // const onFileDrop = (e) => {
  //   const newFile = e.target.files[0]
  //   if (newFile) {
  //     const updatedList = [...fileList, newFile]
  //     setFileList(updatedList)
  //     props.onFileChange(updatedList)
  //   }
  // }

  // const fileRemove = (file) => {
  //   const updatedList = [...fileList]
  //   updatedList.splice(fileList.indexOf(file), 1)
  //   setFileList(updatedList)
  //   props.onFileChange(updatedList)
  // }

  return (
    <>
      <div
        ref={wrapperRef}
        className='drop-file-input'
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        style={{ display: 'grid', placeItems: 'center' }}
      >
        <div
          className='drop-file-input__label'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <img src='./assets/cloudupload.png' alt='' />
          <Typography style={{ textAlign: 'center' }}>
            Drag & Drop your files here
          </Typography>
          <input
            accept='video/mp4'
            id='contained-button-file'
            type='file'
            onChange={onChange}
            style={{
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </div>
        {/* <input
          style={{
            color: 'gray',
            backgroundColor: 'white',
            padding: '8px',

            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
          type='file'
          value=''
          onChange={onChange}
        /> */}

        {/* <input
          accept='video/mp4'
          className={classes.input}
          id='contained-button-file'
          type='file'
          onChange={onChange}
        /> */}

        <label htmlFor='contained-button-file' style={{ margin: ' 1em auto' }}>
          <Button variant='contained' color='primary' component='span'>
            {filename ? filename : 'Choose File'}
          </Button>
        </label>
      </div>
      {fileList.length > 0 ? (
        <div className='drop-file-preview'>
          <p className='drop-file-preview__title'>Ready to upload</p>
        </div>
      ) : null}
    </>
  )
}

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
}

export default DropFileInput
