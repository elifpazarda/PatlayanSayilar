// Balon üzerindeki önceki sayısal değeri alır ve rastgele bir sayı ekler
function getRandomHealth(previousHealth = 1) {
  return previousHealth + Math.floor(Math.random() * 3)
}
// İki dairenin kesişişip kesişmediğini kontrol eder
function isCircleIntersect(circle1, circle2) {
  const dx = circle1.x - circle2.x
  const dy = circle1.y - circle2.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  return distance < circle1.radius + circle2.radius
}

// Dikdörtgen ve çemberin kesişip kesişmediğini kontrol eder
function isRectangleCircleIntersect(rectangle, circle) {
  // Dikdörtgenin orta noktasını bul
  let rectCenterX = rectangle.x + rectangle.width / 2
  let rectCenterY = rectangle.y + rectangle.height / 2

  // Çemberin merkezi ile dikdörtgenin merkezi arasındaki mesafeyi hesaplar
  let distanceX = Math.abs(circle.x - rectCenterX)
  let distanceY = Math.abs(circle.y - rectCenterY)

  // Eğer çember merkezi dikdörtgenin dışında ise kesinlikle kesişmediğini belirtir
  if (distanceX > rectangle.width / 2 + circle.radius) {
    return false
  }
  if (distanceY > rectangle.height / 2 + circle.radius) {
    return false
  }

  // Eğer çember merkezi dikdörtgenin içindeyse kesin kesiştiğini belirtir
  if (distanceX <= rectangle.width / 2) {
    return true
  }
  if (distanceY <= rectangle.height / 2) {
    return true
  }

  // Çemberin köşelerle olan mesafesini kontrol eder
  let cornerDistance_sq =
    (distanceX - rectangle.width / 2) ** 2 +
    (distanceY - rectangle.height / 2) ** 2

  return cornerDistance_sq <= circle.radius ** 2
}

// Bu fonksiyonları dışa aktarır
export {
  getRandomHealth,
  isCircleIntersect,
  isRectangleCircleIntersect
}
