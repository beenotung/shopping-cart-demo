import React, { useEffect } from 'react'
import { getProducts, Product, SelectedProduct } from './helpers'
import { RecoilRoot, atom, useRecoilState } from 'recoil'

export const ProductsAtom = atom<Product[] | null>({
  key: 'Products',
  default: null,
})

export const SelectedProductsAtom = atom<SelectedProduct[]>({
  key: 'SelectedProducts',
  default: [],
})

export function ProductList() {
  const [products, setProducts] = useRecoilState(ProductsAtom)
  const [selectedProducts, setSelectedProducts] =
    useRecoilState(SelectedProductsAtom)

  useEffect(() => {
    getProducts().then(setProducts)
  }, [setProducts])

  function addProduct(product: Product) {
    const alreadySelected = selectedProducts.some(
      selectedProduct => selectedProduct.product === product,
    )
    if (!alreadySelected) {
      setSelectedProducts([...selectedProducts, { product, quantity: 1 }])
      return
    }
    setSelectedProducts(
      selectedProducts.map(selectedProduct =>
        selectedProduct.product !== product
          ? selectedProduct
          : { product, quantity: selectedProduct.quantity + 1 },
      ),
    )
  }

  return (
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
  )
}

export function MyCart() {
  const [selectedProducts, setSelectedProducts] =
    useRecoilState(SelectedProductsAtom)

  function removeProduct(index: number) {
    const newSelectedProducts = selectedProducts.slice()
    newSelectedProducts.splice(index, 1)
    setSelectedProducts(newSelectedProducts)
  }

  return (
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
  )
}

export function App() {
  return (
    <RecoilRoot>
      <ProductList />
      <MyCart />
    </RecoilRoot>
  )
}

export default App
