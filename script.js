// Modüllerin ve yardımcı fonksiyonların import edilmesi
import { Crab } from "./crab.js"
import { Bubble } from "./bubble.js"
import {
  isCircleIntersect,
  isRectangleCircleIntersect
} from "./utilFunctions.js"

// Canvas ve context'in alınması
const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

// Oyunun arkaplan görselinin yüklenmesi
var backgroundImage = new Image()
backgroundImage.src = "images/sea.png"

// Canvas boyutlarının belirlenmesi
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Ses dosyalarının yüklenmesi
const beepSound = new Audio("sounds/beep.mp3")
const gameoverSound = new Audio("sounds/gameover.mp3")

// Oyun elemanlarının oluşturulması
const crab = new Crab(canvas, ctx)
const bubbles = []
var gameScore = 0
var killCount = 0
let bulletInterval
let bubbleInterval
let animationId

// Skorun çizdirilmesi
function drawScore() {
  ctx.fillStyle = "black"
  ctx.font = "24px Arial"
  ctx.textAlign = "left"
  ctx.fillText("Score: " + gameScore, 10, 50)
  ctx.fillText("Kill: " + killCount, 10, 75)
}

// Balonların oluşturulması
function createBubble() {
  if (bubbles.length == 0) {
    bubbles.push(new Bubble(1, canvas, ctx))
  } else if (bubbles.length < 10) {
    let health = bubbles[bubbles.length - 1].health
    bubbles.push(new Bubble(health, canvas, ctx))
  }
}
 
// Animasyonun oluşturulması
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
  drawScore()
  
  // Balonların animasyonu ve çizimi
  for (let i = bubbles.length - 1; i >= 0; i--) {
    const obj = bubbles[i]
    obj.fall()
    obj.draw()

    if (obj.isItBorder) {
      gameOver()
      return
    }
  }

  crab.draw()

  // Mermilerin güncellenmesi ve balonlarla çarpışma kontrolü
  crab.bullets.forEach((bullet, index) => {
    bullet.update()
    if (bullet.y < 0) {
      crab.bullets.splice(index, 1)
    }
    bubbles.forEach((obj, objIndex) => {
      if (isCircleIntersect(bullet, obj)) {
        gameScore += 1
        drawScore()
        obj.health--
        if (obj.health <= 0) {
          bubbles.splice(objIndex, 1)
          killCount++
          beepSound.play()
        }
        crab.bullets.splice(index, 1)
      }
      if (isRectangleCircleIntersect(crab, obj)) {
        gameOver()
        return
      }
    })
  })

  animationId = requestAnimationFrame(animate)
}

// Oyunun bitiş durumu
function gameOver() {
  gameoverSound.play()
  cancelAnimationFrame(animationId)
  alert("Oyun Bitti! \nSkor: " + gameScore + "\nÖldürülenler: " + killCount)
  showRestartButton()
}

// Tekrar oynama butonunun gösterilmesi
function showRestartButton() {
  const restartBtn = document.createElement("button")
  restartBtn.innerText = "Tekrar Oyna"
  restartBtn.style.position = "absolute"
  restartBtn.style.left = "50%"
  restartBtn.style.top = "50%"
  restartBtn.style.transform = "translate(-50%, -50%)"
  restartBtn.style.fontSize = "24px"
  restartBtn.style.padding = "10px 20px"
  restartBtn.style.cursor = "pointer"

  restartBtn.onclick = function () {
    document.body.removeChild(restartBtn)
    restartGame()
  }

  document.body.appendChild(restartBtn)
}

// Oyunun tekrar başlatılması
function restartGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  bubbles.length = 0
  gameScore = 0
  killCount = 0
  clearInterval(bulletInterval)
  clearInterval(bubbleInterval)
  crab.reset()
  startGame()
  const restartBtn = document.querySelector("button")
  if (restartBtn) {
    document.body.removeChild(restartBtn)
  }
}

// Oyunun başlatılması
function startGame() {
  bulletInterval = setInterval(() => {
    crab.fire()
  }, 150 - killCount * 5)

  bubbleInterval = setInterval(createBubble, 2000)

  animate()
}

startGame()

// Ekran boyutunun değişimi durumunda canvas boyutunun güncellenmesi
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})
// Klavye hareketlerinin dinlenmesi
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    var intervalId = setInterval(() => {
      crab.move("left")
    }, 100)
    window.addEventListener("keyup", (event) => {
      clearInterval(intervalId)
    })
  } else if (event.key === "ArrowRight") {
    var intervalId = setInterval(() => {
      crab.move("right")
    }, 100)
    window.addEventListener("keyup", (event) => {
      clearInterval(intervalId)
    })
  }
})

