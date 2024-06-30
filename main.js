console.log('lets make something')
// setting global things up here
/**
 * @type {Number}
 */
let width
/**
 * @type {Number}
 */
let height

// default size is 300x150
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const setupConfiguration = {
  canvas: canvas,
  width: 500,
  height: 500
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

const setup = () => {
  setCanvasSize(setupConfiguration.canvas, setupConfiguration.width, setupConfiguration.height)
}

setup()
