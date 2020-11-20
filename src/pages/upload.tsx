import { Button } from '../components/Button'
import { NextPage } from 'next'
import axios from 'axios'
import { ChangeEvent, useRef } from 'react'

/**
 * Upload page component.
 */
export const UploadPage: NextPage = () => {
  const fileInputRef = useRef<HTMLInputElement>()

  const onUploadClicked = () => {
    fileInputRef.current.click()
  }

  const onFileChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files)

    files.forEach(upload)
  }

  const upload = async (file: File) => {
    console.log('uploading', file)
    const form = new FormData()
    form.append('image', file)
    await axios.post('http://localhost:8000/upload', form).then(() => {
      console.log('Ok')
    })
    console.log('uploaded')
  }

  return (
    <>
      <div className="container">
        <div className="uploader">
          <h1 className="title">upload image</h1>
          <div className="dropArea">
            <div className="dropMessage">drop image here</div>
            <div className="dropOr">or</div>
            <Button onClick={onUploadClicked}>upload</Button>
          </div>
          <input
            className="fileInput"
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={onFileChanged}
          />
        </div>
      </div>

      <style global jsx>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background: #eeeeff;
          color: #202020;
        }

        .fileInput {
          display: none;
        }

        .title {
          text-align: center;
        }

        .dropMessage {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .dropOr {
          color: #505050;
          margin: 0.4rem 0;
        }

        .dropArea {
          border: 4px dashed #202020;
          border-radius: 8px;
          width: 100%;
          height: 200px;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .uploader {
          min-width: 600px;
        }

        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  )
}

export default UploadPage
