const WebSocket = require('ws')
const fs = require('fs')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg');  
const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
  console.log('client connected')

  ws.onerror = err => {
    console.error('connection error:', err)
  }

  ws.on('message', message => {
    const dir = path.join(__dirname, 'frames')
    const filename = `image_${Date.now()}.png`
    const filepath = path.join(dir, filename)

    fs.writeFile(filepath, message, err => {
      if(err) {
        console.error('Failed to save image:', err)
        return
      }
      console.log('image saved')
    })
  })
})