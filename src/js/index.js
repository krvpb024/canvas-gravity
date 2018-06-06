import '../css/index.css'
import { generateColor } from './util'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

class Canvas {
  constructor (canvas, initFunction) {
    this.element = canvas
    this.initFunction = initFunction
  }
  fitBrowserSize () {
    this.element.width = window.innerWidth
    this.element.height = window.innerHeight
  }
}

class Ball {
  constructor (x, y, dx, dy, r, color, f, g) {
    this.r = r || Math.floor(Math.random() * (50 - 20) + 20)
    this.x = x || Math.random() * (canvas.width - this.r * 2) + this.r
    this.y = y || Math.random() * (canvas.height - this.r * 2) + this.r
    this.dx = dx === 0 ? 0 : dx || (Math.random() - 0.5) * (10 - 5) + 5
    this.dy = dy === 0 ? 0 : dy || (Math.random() - 0.5) * 2
    this.color = color || generateColor()
    this.f = f || 0.8
    this.g = g || 1
  }

  draw () {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  checkBoundary () {
    if (this.x + this.r > window.innerWidth) {
      this.dx = Math.ceil(-Math.abs(this.dx)) * this.f
    } else if (this.x - this.r < 0) {
      this.dx = Math.ceil(Math.abs(this.dx)) * this.f
    } else if (this.dy === 0) {
      this.dx = this.dx * 0.977
    }
    if (this.y + this.r > window.innerHeight) {
      this.dy = Math.ceil(-Math.abs(this.dy)) * this.f
    } else if (this.y - this.r < 0) {
      this.dy = Math.ceil(Math.abs(this.dy)) * this.f
    } else {
      this.dy += this.g
    }
  }
  move () {
    this.x += this.dx
    this.y += this.dy
  }

  run () {
    this.checkBoundary()
    this.move()
    this.draw()
  }
}

let balls = []
function generateBall (array) {
  for (let i = 0; i < 10; i += 1) {
    const ball = new Ball()
    array.push(ball)
  }
}

generateBall(balls)

const canvasControl = new Canvas(canvas, init)
canvasControl.fitBrowserSize()

function init () {
  requestAnimationFrame(init)
  ctx.clearRect(0, 0, canvasControl.element.width, canvasControl.element.height)
  balls.forEach((ball) => {
    ball.run()
  })
}

init()

window.addEventListener('resize', () => {
  canvasControl.fitBrowserSize()
  balls = []
  generateBall(balls)
  ctx.clearRect(0, 0, canvasControl.element.width, canvasControl.element.height)
})

window.addEventListener('click', (e) => {
  balls.push(new Ball(e.x, e.y))
})
