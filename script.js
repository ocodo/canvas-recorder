const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight
let particleArray

let connectionColor = (opacityValue) => `rgba(255,100,0,${opacityValue})`
let particleColor = () => `rgba(0,0,0,1)`
let particleFillColor = () => `rgba(255,255,255,0.15)`

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x
    this.y = y
    this.directionX = directionX
    this.directionY = directionY
    this.size = size
    this.color = color
    this.speedX = this.directionX
    this.speedY = this.directionY
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
    ctx.fillStyle = particleFillColor()
    ctx.fill()
  }

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX
      this.speedX = this.directionX
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
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
  // let numberOfParticles = (canvas.height * canvas.width) / 10000

  let numberOfParticles = 80
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 12
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2
    let directionX = Math.random() * 2 - 1
    let directionY = Math.random() * 2 - 1
    let color = particleColor()
    particleArray.push(new Particle(x, y, directionX, directionY, size, color))
  }
}

function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update()
  }
  connect()
}

// Start...
init()
animate()

