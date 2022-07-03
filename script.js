const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight
let particleArray

let connectionColor = (opacityValue) => `rgba(255,127,0,${opacityValue})`
let particleFillColor = () => `rgba(255,0,0,0.10)`

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x
    this.y = y
    this.directionX = directionX
    this.directionY = directionY
    this.size = size
    this.speedX = this.directionX
    this.speedY = this.directionY
    this.color = color
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX
      this.speedX = this.directionX
    }
    let boxHeight = canvas.height / 2
    let offset = boxHeight / 2
    if (this.y + this.size > boxHeight + offset || this.y - this.size < offset) {
      this.directionY = -this.directionY
      this.speedY = this.directionY
    }

    let dx = this.x
    let dy = this.y
    let distance = Math.sqrt(dx * dx + dy * dy)
    this.x += this.directionX
    this.y += this.directionY
    this.draw()
  }
}

function connect() {
  let opacityValue = 1
  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      let distance =
        (particleArray[a].x - particleArray[b].x) *
          (particleArray[a].x - particleArray[b].x) +
        (particleArray[a].y - particleArray[b].y) *
          (particleArray[a].y - particleArray[b].y)

      if (distance < (canvas.width / 2.1) * (canvas.height / 1.5)) {
        opacityValue = 1 - distance / 20000
        ctx.strokeStyle = connectionColor(opacityValue)
        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.moveTo(particleArray[a].x, particleArray[a].y)
        ctx.lineTo(particleArray[b].x, particleArray[b].y)
        ctx.stroke()
      }
    }
  }
}

function init() {
  particleArray = []

  let numberOfParticles = 100
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 12

    let x = Math.random() * (innerWidth - size * 2)

    let boxHeight = innerHeight / 2
    let offset = boxHeight / 2

    let y = (Math.random() * (boxHeight - size * 2)) + offset

    let directionX = Math.random() * 2 - 1
    let directionY = Math.random() * 2 - 1
    let color = particleFillColor()
    particleArray.push(new Particle(x, y, directionX, directionY, size, color))
  }
}

function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  ctx.fillStyle =  "#111" // "#0A1e2a"
  ctx.fillRect(0, 0, innerWidth, innerHeight)
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update()
  }
  connect()
}

// Start...
init()
animate()
