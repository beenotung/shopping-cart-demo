import React, { useEffect, useState } from 'react'
import { getProducts, Product, SelectedProduct } from './helpers'

export function App() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  )

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  function addProduct(product: Product) {
    let selectedProduct = selectedProducts.find(
      selectedProduct => selectedProduct.product === product,
    )
    if (!selectedProduct) {
      selectedProduct = { product, quantity: 0 }
      selectedProducts.push(selectedProduct)
    }
    selectedProduct.quantity++
    const newSelectedProducts = selectedProducts.slice() // force React to re-render
    setSelectedProducts(newSelectedProducts)
  }

  function removeProduct(index: number) {
    selectedProducts.splice(index, 1)
    const newSelectedProducts = selectedProducts.slice() // force React to re-render
    setSelectedProducts(newSelectedProducts)
  }

  return (
    <>
      <div className="product-list">
        <h2>Product List</h2>
        {!products
          ? 'loading...'
          : products.map(product => (
              <div key={product.id} className="product-overview">
                <h3>
                  Product #{product.id}: {product.name}
                </h3>
                <button onClick={() => addProduct(product)}>Add to cart</button>
              </div>
            ))}
      </div>
      <div className="my-cart">
        <h2>My Cart</h2>
        {selectedProducts.map(({ product, quantity }, i) => (
          <div key={i} className="selected-product">
            <p>
              Product #{product.id} {product.name} x {quantity}
            </p>
            <button onClick={() => removeProduct(i)}>Remove</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
