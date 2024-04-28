// Yengeç sınıfı tanımlanıyor
class Crab {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.width = canvas.width / 10 // Yengeç genişliği
    this.height = canvas.width / 10 // Yengeç yüksekliği
    this.x = (canvas.width - this.width) / 2 // Yengeç başlangıç konumu x
    // this.y = canvas.height - this.height // Yengeç başlangıç konumu y
    this.y = (canvas.height - this.height) // Yengeç başlangıç konumu y
    this.moveSpeed = canvas.width / 40 // Yengeç hareket hızı
    this.bullets = [] // Yengeç mermileri
    this.image = new Image() // Yengeç resmi
    this.image.src = "images/crab.png" // Yengeç resminin yolu
  }

  // Yengeç çizim fonksiyonu
  draw() {
    // Yengeç çizimi
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    // Mermilerin çizimi
    this.bullets.forEach((bullet) => bullet.draw())
  }

  // Yengeçin hareket fonksiyonu
  move(direction) {
    switch (direction) {
      case "left":
        if (this.x > 0 && this.x + this.moveSpeed > 0) {
          this.x -= this.moveSpeed
        }
        break
      case "right":
        if (
          this.x + this.width < this.canvas.width &&
          this.x + this.width + this.moveSpeed < this.canvas.width
        ) {
          this.x += this.moveSpeed
        }
        break
    }

    // Mermilerin ekran sınırlarında kalmasını sağlar
    this.bullets = this.bullets.filter((bullet) => bullet.y > 0)
  }

  // Yengeçin ateş etme fonksiyonu
  fire() {
    const bullet = new Bullet(
      this.canvas,
      this.ctx,
      this.x + this.width / 2,
      this.y - 2
    )
    this.bullets.push(bullet)
  }

  // Yengeçin başlangıç konumuna sıfırlanması
  reset() {
    this.x = this.canvas.width / 2 - this.width / 2 // Yengeçi yatayda ortala
  }
}

// Mermi sınıfı tanımlanıyor
class Bullet {
  constructor(canvas, ctx, x, y) {
    this.canvas = canvas
    this.ctx = ctx
    this.x = x // Mermi konumu x
    this.y = y // Mermi konumu y
    this.radius = 3 // Mermi yarıçapı
    this.speed = 7 // Mermi hızı
  }

  // Mermi çizim fonksiyonu
  draw() {
    this.ctx.fillStyle = "red"
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.fill()
  }

  // Mermi güncelleme fonksiyonu
  update() {
    this.y -= this.speed // Mermi y konumunu günceller
  }

  // Mermi konum bilgisini getiren fonksiyon
  get locationInformation() {
    return {
      x: this.x,
      y: this.y,
      radius: this.radius
    }
  }
}

export { Crab } // Crab sınıfını dışa aktarır

