console.log('lets make something')

// default size is 300x150
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const ws = new WebSocket('ws://localhost:8080')


// configuration object
/**
 * @type {
 *  { 
 *    canvas: HTMLCanvasElement,
 *    width: Number,
 *    height: Number,
 *    complete: Boolean,
 *    frameLimit: Number, set in setFrameLimit - called by setup
 *    frameRate: Number, in frames per second
 *    animationDuration: Number, in seconds
 *  }
 * }
 */
const setupConfiguration = {
  canvas: canvas,
  width: 500,
  height: 500,
  frameRate: 24,
  animationDuration: 10,
  complete: false
}

const connectWebSocket = () => {
  ws.onopen = () => {
    console.log('connection established')
  }

  ws.onerror = (err) => {
    console.error('connection error:', err)
  }
}
/**
 * 
 * @param {HTMLCanvasElement} canvas 
 * @param {Number} width 
 * @param {Number} height 
 */
const setCanvasSize = (canvas, width, height) => {
  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)
}

const setFrameLimit = () => {
  setupConfiguration.frameLimit = setupConfiguration.frameRate * setupConfiguration.animationDuration
}

const setup = () => {
  connectWebSocket()
  setFrameLimit(setupConfiguration.frameRate, setupConfiguration.animationDuration)
  setCanvasSize(setupConfiguration.canvas, setupConfiguration.width, setupConfiguration.height)
  setupConfiguration.complete = true
}

setup()

let frame = 0
// ideally this is called a set amount of times, frameCount is set in configuration to determine
const draw = () => {
  if(setupConfiguration.complete && frame <= setupConfiguration.frameLimit) {
    ctx.fillStyle = 'red'
    ctx.fillRect(0, 0, 500, 500)

    const x = Math.random() * (setupConfiguration.width - 20)
    const y = Math.random() * (setupConfiguration.height - 20)
    const radius = Math.random() * 20 + 5

    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2, true)
    ctx.fillStyle = 'blue'
    ctx.fill()

    sendFrameToWebhook()
    cleanup(frame++)
    requestAnimationFrame(draw)
  } else {
    console.log('done')
  }
}

const sendFrameToWebhook = () => {
 
  canvas.toBlob(blob => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(blob)
    }
  }), 'image/png'
}

/**
 * 
 * @param {Number} frame 
 * @param {HTMLCanvasElement} canvas 
 */
// a set of instructions to run at the end of each draw step
const cleanup = (frame, canvas) => {
  // update frame count
  const frameCount = document.getElementById('frameCount')
  frameCount.innerHTML = `Frame #: ${frame}`
}

if (setupConfiguration.complete) {
  requestAnimationFrame(draw)
}
