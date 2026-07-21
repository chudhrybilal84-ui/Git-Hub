import { describe, expect, it } from 'vitest'
import { addToCart, calculateTotal, getCartCount, updateQuantity } from './cart.js'

describe('cart helpers', () => {
  it('adds a product to the cart and increases quantity for duplicates', () => {
    const cart = []
    const product = { id: 1, name: 'Laptop', price: 799 }

    const first = addToCart(cart, product)
    const second = addToCart(first, product)

    expect(getCartCount(second)).toBe(2)
    expect(calculateTotal(second)).toBe(1598)
  })

  it('keeps the cart count in sync for multiple products', () => {
    const cart = []
    const first = addToCart(cart, { id: 1, name: 'Laptop', price: 799 })
    const second = addToCart(first, { id: 2, name: 'Mouse', price: 29 })

    expect(getCartCount(second)).toBe(2)
    expect(calculateTotal(second)).toBe(828)
  })

  it('updates the quantity of an existing item', () => {
    const cart = addToCart([], { id: 1, name: 'Laptop', price: 799 })
    const updatedCart = updateQuantity(cart, 1, 1)

    expect(getCartCount(updatedCart)).toBe(2)
    expect(calculateTotal(updatedCart)).toBe(1598)
  })
})
