export function filterProducts(products, searchTerm, activeCategory) {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  return products.filter((product) => {
    const matchesSearch =
      normalizedSearch === '' ||
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch)

    const matchesCategory = activeCategory === 'All' || product.category === activeCategory

    return matchesSearch && matchesCategory
  })
}
