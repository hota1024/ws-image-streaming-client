import { useEffect, useState } from 'react'
import SocketIO from 'socket.io-client'

export default function Home(): React.ReactElement {
  const [image, setImage] = useState<string>()

  useEffect(() => {
    const io = SocketIO('http://localhost:8000')

    io.on('image', (data: ArrayBuffer) => {
      setImage(`data:image/png;base64,${Buffer.from(data).toString('base64')}`)
    })
  }, [])

  return (
    <>
      <div className="container">
        <img className="image" src={image} />
      </div>

      <style global jsx>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background: #eeeeff;
        }

        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .image {
          border-radius: 4px;
          box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
          max-width: 640px;
        }
      `}</style>
    </>
  )
}
