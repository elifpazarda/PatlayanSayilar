// Yardımcı fonksiyonlar modülünü 'Utils' olarak içe aktar
import * as Utils from "./utilFunctions.js"

// Canvas ve context'in alınması
const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

// Balon sınıfı tanımlanıyor
class Bubble {
  constructor(previousHealth, canvas, ctx) {
    // Balonun rastgele bir sağlık değeri alması
    this.health = Utils.getRandomHealth(previousHealth)
    // Ekran genişliğine göre boyutun hesaplanması
    this.radius = canvas.width / 30 // Çapın yarısı, çünkü bir daire çiziyoruz
    // Başlangıç x ve y pozisyonlarının rastgele atanması
    this.x =
      Math.floor(Math.random() * (canvas.width - this.radius * 2)) +
      Math.floor(this.radius)
    this.y = -this.radius // Canvas'ın üstünde başlar
    this.fallSpeed = 1 // Başlangıç düşme hızı
    this.canvas = canvas
    this.ctx = ctx
    this.image = new Image() // Balon resmi
    this.image.src = "images/bubble.png" // Balon resminin yolu
  }

  // Balonun çizilmesi
  draw() {
    // Balonun bir daire olarak çizilmesi
    ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)

    // Balonun sağlık değerinin çizilmesi
    ctx.fillStyle = "white"
    ctx.font = "16px Arial"
    ctx.textAlign = "center" // Metni yatayda ortalar
    ctx.textBaseline = "middle" // Metni dikeyde ortalar
    ctx.fillText(this.health, this.x, this.y)
  }

  // Balonun düşmesi
  fall() {
    // Düşme hızını artırarak düşmeyi hızlandırır
    this.fallSpeed += 0.001
    this.y += this.fallSpeed
  }

  // Balonun canvas'ın alt kenarına ulaşıp ulaşmadığını kontrol eder
  get isItBorder() {
    return this.y + this.radius >= canvas.height
  }

  // Balonun konum bilgisini getiren fonksiyon
  get locationInformation() {
    return {
      x: this.x,
      y: this.y,
      radius: this.radius
    }
  }
}

export { Bubble } // Bubble sınıfını dışa aktarır
