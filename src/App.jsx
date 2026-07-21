import { useMemo, useState } from 'react'
import './App.css'
import { addToCart, calculateTotal, getCartCount, updateQuantity } from './lib/cart'
import { filterProducts } from './lib/products'

const allProducts = [
  { id: 1, name: 'Aurora Headphones', price: 149999, tag: 'New', category: 'Audio', image: '🎧', discount: '15% off' },
  { id: 2, name: 'Luma Smart Watch', price: 189999, tag: 'Best Seller', category: 'Wearables', image: '⌚', discount: 'Free shipping' },
  { id: 3, name: 'Nova Backpack', price: 129999, tag: 'Sale', category: 'Travel', image: '🎒', discount: '20% off' },
  { id: 4, name: 'Glow Laptop Stand', price: 109999, tag: 'Hot', category: 'Work', image: '💻', discount: 'Limited' },
  { id: 5, name: 'Nova Mobile X', price: 159999, tag: 'New', category: 'Mobiles', image: '📱', discount: '10% off' },
  { id: 6, name: 'Luma Mobile Pro', price: 199999, tag: 'Best Seller', category: 'Mobiles', image: '📱', discount: 'Free case' },
  { id: 7, name: 'Vivo Y28', price: 129999, tag: 'Hot', category: 'Mobiles', image: '📱', discount: '12% off' },
  { id: 8, name: 'Infinix Hot 40', price: 119999, tag: 'Trending', category: 'Mobiles', image: '📱', discount: 'Budget pick' },
  { id: 9, name: 'iPhone 14', price: 329999, originalPrice: 364444, tag: 'Popular', category: 'Mobiles', image: '📱', discount: 'Limited stock' },
  { id: 10, name: 'iPhone 14 Pro', price: 449999, originalPrice: 499999, tag: 'Best Seller', category: 'Mobiles', image: '📱', discount: 'Free delivery' },
  { id: 11, name: 'iPhone 15', price: 499999, originalPrice: 555555, tag: 'New', category: 'Mobiles', image: '📱', discount: 'Latest' },
  { id: 12, name: 'iPhone 15 Pro', price: 599999, originalPrice: 666666, tag: 'Premium', category: 'Mobiles', image: '📱', discount: 'Exclusive' },
  { id: 13, name: 'iPhone 15 Pro Max', price: 699999, originalPrice: 777777, tag: 'Premium', category: 'Mobiles', image: '📱', discount: 'Top tier' },
  { id: 14, name: 'Elegant Hand Carry', price: 109999, tag: 'Trending', category: 'Hand Carry', image: '👜', discount: 'Shop now' },
]

const categories = ['All', 'Audio', 'Wearables', 'Travel', 'Work', 'Mobiles', 'Hand Carry']

function App() {
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [orderMessage, setOrderMessage] = useState('')

  const totalItems = useMemo(() => getCartCount(cart), [cart])
  const totalPrice = useMemo(() => calculateTotal(cart), [cart])
  const visibleProducts = useMemo(
    () => filterProducts(allProducts, search, activeCategory),
    [search, activeCategory],
  )

  function handleAddToCart(product) {
    setCart((currentCart) => addToCart(currentCart, product))
  }

  function handleQuantityChange(productId, delta) {
    setCart((currentCart) => updateQuantity(currentCart, productId, delta))
  }

  function handleCheckout() {
    if (cart.length === 0) return
    setOrderMessage(`Order received! Your order of ${totalItems} item(s) is being prepared for delivery.`)
    setCart([])
  }

  return (
    <div className="app-shell">
      <header className="hero-bar">
        <div className="top-nav">
          <div className="brand">Noor Fatima Store</div>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Deals</a>
            <a href="#">Contact</a>
          </nav>
        </div>

        <div className="hero-content">
          <div>
            <p className="eyebrow">Modern essentials</p>
            <h1>Shop the latest gadgets</h1>
            <p className="hero-copy">
              Discover premium picks for work, travel, and everyday style.
            </p>
          </div>
          <div className="cart-pill">
            <span>Cart</span>
            <strong>{totalItems} items</strong>
          </div>
        </div>

        <div className="contact-row">
          <span>Contact: 0324-9315334</span>
        </div>
      </header>

      <main className="content-grid">
        <section className="products-section">
          <div className="showcase-banner">
            <div>
              <p className="eyebrow">Limited time</p>
              <h2>Flash offer: up to 30% off on select items</h2>
            </div>
            <button type="button">Shop deals</button>
          </div>
          <div className="section-heading">
            <h2>Featured products</h2>
            <p>Fast shipping and free returns on every order.</p>
          </div>

          <div className="search-row">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products"
            />
          </div>

          <div className="category-row">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`chip ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <span className="product-image" aria-hidden="true">
                  {product.image}
                </span>
                <div className="product-meta">
                  <span className="product-tag">{product.tag}</span>
                  {product.originalPrice ? (
                    <span className="discount-badge">Sale</span>
                  ) : (
                    <span className="discount-badge">{product.discount}</span>
                  )}
                </div>
                <h3>{product.name}</h3>
                <p className="product-price">
                  PKR {product.price.toLocaleString()}
                  {product.originalPrice ? (
                    <span className="discount-note"> • 10% off</span>
                  ) : null}
                </p>
                <button type="button" onClick={() => handleAddToCart(product)}>
                  Add to cart
                </button>
              </article>
            ))}
          </div>
        </section>

        <aside className="cart-panel">
          <h2>Your cart</h2>
          {cart.length === 0 ? (
            <p className="empty-state">Your cart is empty. Add a product to get started.</p>
          ) : (
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id}>
                  <div className="cart-item-info">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <strong>PKR {(item.price * item.quantity).toLocaleString()}</strong>
                  </div>
                  <div className="quantity-controls">
                    <button type="button" className="qty-btn" onClick={() => handleQuantityChange(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" className="qty-btn" onClick={() => handleQuantityChange(item.id, 1)}>
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="cart-total">
            <span>Total</span>
            <strong>PKR {totalPrice.toLocaleString()}</strong>
          </div>
          {orderMessage ? (
            <div className="order-received">
              <strong>Order received</strong>
              <p>{orderMessage}</p>
            </div>
          ) : null}
          <button type="button" className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </aside>
      </main>
    </div>
  )
}

export default App
