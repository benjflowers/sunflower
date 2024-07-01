console.log('lets make something')

// default size is 300x150
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// configuration object
/**
 * @type {
 *  { 
 *    canvas: HTMLCanvasElement,
 *    width: Number,
 *    height: Number,
 *    complete: Boolean,
 *    frameLimit: Number, set in setup function
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

    cleanup(frame++)
    requestAnimationFrame(draw)
  } else {
    console.log('done')
  }
}

// a set of instructions to run at the end of each draw step
const cleanup = (frame) => {
  // update frame count
  const frameCount = document.getElementById('frameCount')
  frameCount.innerHTML = `Frame #: ${frame}`
}

if (setupConfiguration.complete) {
  requestAnimationFrame(draw)
}
