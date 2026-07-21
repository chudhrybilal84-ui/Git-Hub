export function addToCart(cart, product) {
  const existingItem = cart.find((item) => item.id === product.id)

  if (existingItem) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
    )
  }

  return [...cart, { ...product, quantity: 1 }]
}

export function getCartCount(cart) {
  return cart.reduce((total, item) => total + item.quantity, 0)
}

export function calculateTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

export function updateQuantity(cart, productId, delta) {
  return cart
    .map((item) => {
      if (item.id !== productId) return item

      const nextQuantity = item.quantity + delta
      if (nextQuantity <= 0) return null

      return { ...item, quantity: nextQuantity }
    })
    .filter(Boolean)
}
