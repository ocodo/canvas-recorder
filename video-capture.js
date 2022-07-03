// Video recorder
const stream = canvas.captureStream()
const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' })

const data = []
recorder.ondataavailable = function (event) {
  if (event.data && event.data.size) {
    data.push(event.data)
  }
}

recorder.onstop = () => {
  const url = URL.createObjectURL(new Blob(data, { type: 'video/webm' }))
  document.querySelector("#videoContainer").style.display = "block"
  document.querySelector("video").src = url
}

window.addEventListener("resize", function () {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})

let timer = document.querySelector("#timer");

function padDigits(num, pad) {
  return num.toString().padStart(pad, '0');
}

function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${padDigits(hours,2)}:${padDigits(minutes,2)}:${padDigits(seconds,2)}`;
}

let recordingTimer = (duration) => setTimeout(stopRecording, duration)
let recordingInterval = () => setInterval(e => {
  timer.textContent = convertMsToTime(Date.now() - window.recordingTime)
}, 1, 0)

let record = document.querySelector("#record")
let duration = document.querySelector("#duration")

let stopRecording = () => {
  record.classList.remove("active")
  stop.classList.remove("ready")
  recorder.stop()
  clearInterval(window.activeInterval)
  clearTimeout(window.activeTimer)
}

record.onclick = e => {
  record.classList.add("active")
  stop.classList.add("ready")

  if (duration.textContent != "") {
    let time = parseFloat(duration.textContent)
    if (!isNaN(time)) window.activeTimer = recordingTimer(time)
  }

  window.activeInterval = recordingInterval()
  window.recordingTime = Date.now()
  recorder.start()
}

let stop = document.querySelector("#stop")
stop.onclick = stopRecording


